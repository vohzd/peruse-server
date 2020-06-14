const Minio                       = require("minio")
const minioConfig                 = require("../../config/minio.js");
const FileModel                   = require("../../models/file.js");
const FS                          = require("fs");

var minioClient = new Minio.Client({
    endPoint: minioConfig.endPoint,
    port: minioConfig.port,
    useSSL: minioConfig.useSSL,
    accessKey: minioConfig.accessKey,
    secretKey: minioConfig.secretKey
});

async function _moveObject(id, path, type, bucketName){
  return new Promise(async (resolve, reject) => {

    try {
      const dataStream = await minioClient.getObject('incoming', id);
      const object = await minioClient.putObject(bucketName, path, dataStream, { "Content-Type": type });
      console.log("move completed");
      console.log(object)
      return resolve(object)

    }
    catch (e){
      console.log("ERROR")
      console.log(e)
      return reject(e)
    }

  });
}

async function _deleteObject(bucketName, objectName){
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucketName, objectName, (e) => {
      if (e) { return reject(e); }
      else { return resolve() }
    })
  });
}


async function getFiles(query){
  return await FileModel.find(query);
}


async function _moveToCorrectPath(id, path, type, bucketName){
  return new Promise(async (resolve, reject) => {
    try {
      // the .info bit is because tus creates a metadata file...
      const values = await Promise.all(
        await _moveObject(id, path, type, bucketName),
        await _deleteObject("incoming", id),
        await _deleteObject("incoming", `${id}.info`)
      );
      return resolve(values)
    }
    catch (e){
      console.log("MOVE TO CORRECT PATH ERROR")
      console.log(e)
      return reject(e);
    }
  });
}

async function _saveManyFiles(files){
  return new Promise(async (resolve, reject) => {
    try {
      let formattedFiles = [];
      files.forEach((file, i) => {
        formattedFiles.push(new FileModel({
          name: file.name,
          location: `https://${minioConfig.endPoint}/epitrade/${file.folder}/${file.name}`.trim(),
          folder: file.folder,
          size: file.size,
          type: file.type
        }));
      });
      try {
        console.log(formattedFiles)
        await FileModel.insertMany(formattedFiles)
        return resolve();
      }
      catch (e){
        throw new Error(e);
      }
    }
    catch (e){
      return reject(new Error(e));
    }
  });
}

async function handleFiles(files){

  // build an array of promises first...  (FIFO datastructure)
  let promises = [];
  files.forEach(async (file, i) => {
    const path = `${file.folder}/${file.name}`;
    promises.push(_moveToCorrectPath(file.tusObjectId, path, file.type, "epitrade"));
  });

  // next push the database transaction to occur at the very end
  promises.push(_saveManyFiles(files));

  // finally execute/resolve it
  return new Promise(async (resolve, reject) => {
    try {
      const values = await Promise.all(promises);
      return resolve(values);
    }
    catch (e){
      return reject(e);
    }
  });

}


module.exports = {
  getFiles,
  handleFiles
}
