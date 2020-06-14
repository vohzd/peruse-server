const OrderModel                          = require("../../models/order.js");
const ProductModel                        = require("../../models/product.js");
const {
  payPalClient,
  payPalOrderGetRequest,
  payPalPendingOrderDetails
}                                         = require("../../middleware/paypal.js");

async function createPurchaseIntent(details){
  let order = new OrderModel({
    deliveryCost: 3.20,
    origin: "paypal",
    items: details.items,
    user: details.user
  });
  return await order.save();
}

async function decrementStock(orderId){
  const order = await OrderModel.findOne({ "_id": orderId });
  order.items.forEach(async (v, i) => {
    const product = await ProductModel.findOneAndUpdate({ "_id": v._id }, {
      $inc: { stock: -parseInt(order.items[i].quantity) }
    });
  });
};

async function deleteOrder(id){
  const order = await OrderModel.findByIdAndRemove({
    "_id": id
  });
  return await order.remove();
}

async function markOrderPaid(details){
  return await OrderModel.findOneAndUpdate({ "_id": details.id }, {
    "status": "purchased",
    "transactionID": details.transactionID,
    "deliveryAddress": {
      "name": details.fullName,
      "address": {
        "line1": details.address.line1,
        "area1": details.address.area1,
        "area2": details.address.area2,
        "postcode": details.address.postcode,
        "country": details.address.country
      }
    }
  });
};

async function getAllOrders(query){
  return await OrderModel.find(query);
}

async function getPrices(order){
  // goes to db and get ACTUAL prices from db. stops clients from setting their own prices...
  return new Promise((resolve, reject) => {
    let finalCost = 0;
    order.items.forEach(async (item, i) => {
        const productQuery = await ProductModel.find({ "_id": item._id });
        finalCost += parseFloat((productQuery[0].price * item.quantity).toFixed(2));
        if (i === (order.items.length - 1)){
           return resolve((finalCost).toFixed(2))
        }
    });
  });
};

async function getDeliveryAddress(transactionID){
  const orderRequest = await payPalOrderGetRequest(transactionID);
  const { result } = await payPalClient().execute(orderRequest);
  return result.purchase_units[0].shipping;
}

async function getFinalCost(purchaseIntentId){
  const orderQuery = await OrderModel.find({ "_id": purchaseIntentId });
  const deliveryCost = 3.20;
  const safeProductPriceTotal = await getPrices(orderQuery[0]);
  return (parseFloat(deliveryCost) + parseFloat(safeProductPriceTotal)).toFixed(2);
}

async function updateOrder(id, body){
  return await OrderModel.findOneAndUpdate({ "_id": id}, { ...body }, { upsert: true });
}

module.exports = {
  createPurchaseIntent,
  decrementStock,
  deleteOrder,
  getAllOrders,
  getDeliveryAddress,
  getFinalCost,
  getPrices,
  markOrderPaid,
  updateOrder
};
