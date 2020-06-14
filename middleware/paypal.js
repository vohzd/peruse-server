const paypal  = require("@paypal/checkout-server-sdk");

function environment() {
    // you need to retreive these from the db instead of env vars...
    let clientID = process.env.PAYPAL_CLIENT_ID || 'AWZ0BxqD0SNqbwkIutx8sXLFgmS-Ye8Qsl2C8Pmogm_D6JMGaEEhFr3Gq3SIFkpjgNIV1yuxCIerAJ76';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'ELmSO3QRt96HqGGL_5VvCLnWf8M74AcHELLK4Ii6xIhd-JZ7_GO1D6S9_bpX2hUNGESFrkAF0EWNXHjL';

    // sandbox - change to prod somehow...
    return new paypal.core.SandboxEnvironment(
        clientID, clientSecret
    );
}

function payPalClient() {
  return new paypal.core.PayPalHttpClient(environment());
}

function payPalOrderGetRequest(transactionID){
  return new paypal.orders.OrdersGetRequest(transactionID);
}

async function payPalOrderCreateRequest(finalCost){
  console.log("HALLO")
  console.log(finalCost)
  const request = new paypal.orders.OrdersCreateRequest();
  console.log(request);

  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "GBP",
        value: finalCost
      }
    }]
  });

  return await payPalClient().execute(request);
}


module.exports = {
  payPalClient,
  payPalOrderCreateRequest,
  payPalOrderGetRequest
}
