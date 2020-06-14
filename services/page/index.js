const PageModel                           = require("../../models/page.js");

async function createPage(payload){
  let page = new PageModel({
    ...payload
  });
  return await page.save();
}

async function deletePage(id){
  const page = await PageModel.findByIdAndRemove({
    "_id": id
  });
  return await page.remove();
}

async function getAllPages(query){
  return await PageModel.find(query);
}

async function updatePage(id, body){
  return await PageModel.findOneAndUpdate({ "_id": id}, { ...body }, { upsert: true });
}

module.exports = {
  createPage,
  deletePage,
  getAllPages,
  updatePage
};
