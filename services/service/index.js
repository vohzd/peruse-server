const ServiceModel                           = require("../../models/service.js");

async function createService(payload){
  let service = new ServiceModel({
    ...payload
  });
  return await service.save();
}

async function deleteService(id){
  const service = await ServiceModel.findByIdAndRemove({
    "_id": id
  });
  return await service.remove();
}

async function getAllServices(query){
  return await ServiceModel.find(query);
}

async function updateService(id, body){
  return await ServiceModel.findOneAndUpdate({ "_id": id}, { ...body }, { upsert: true });
}

module.exports = {
  createService,
  deleteService,
  getAllServices,
  updateService
};
