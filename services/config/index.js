const ConfigModel                           = require("../../models/config.js");

async function createConfig(payload){
  let config = new ConfigModel({
    ...payload
  });
  return await config.save();
}

async function deleteConfig(id){
  const config = await ConfigModel.findByIdAndRemove({
    "_id": id
  });
  return await config.remove();
}

async function getConfig(query){
  return await ConfigModel.findOne(query);
}

async function updateConfig(id, body){
  return await ConfigModel.findOneAndUpdate({ "_id": id}, { ...body }, { upsert: true });
}

module.exports = {
  createConfig,
  deleteConfig,
  getConfig,
  updateConfig
};
