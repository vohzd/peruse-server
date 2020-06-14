const MessageModel                           = require("../../models/message.js");

async function createMessage(payload){
  let message = new MessageModel({
    ...payload
  });
  return await message.save();
}

async function deleteMessage(id){
  const message = await MessageModel.findByIdAndRemove({
    "_id": id
  });
  return await message.remove();
}

async function getAllMessages(query){
  return await MessageModel.find(query);
}

async function updateMessage(id, body){
  return await MessageModel.findOneAndUpdate({ "_id": id}, { ...body }, { upsert: true });
}

module.exports = {
  createMessage,
  deleteMessage,
  getAllMessages,
  updateMessage
};
