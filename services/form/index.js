const FormModel                           = require("../../models/form.js");

async function createForm(payload){
  let form = new FormModel({
    ...payload
  });
  return await form.save();
}

async function deleteForm(id){
  const form = await FormModel.findByIdAndRemove({
    "_id": id
  });
  return await form.remove();
}

async function getAllForms(query){
  return await FormModel.find(query);
}

async function updateForm(id, body){
  return await FormModel.findOneAndUpdate({ "_id": id}, { ...body }, { upsert: true });
}

module.exports = {
  createForm,
  deleteForm,
  getAllForms,
  updateForm
};
