const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 1789 });
let clients = {};
let admins = [];

wss.on("connection", (ws, req) => {
  ws.id = getIDFromRequest(req);
  recordClient(req);
});

function recordClient(req){
  const fingerprint = getFingerPrint(req);
  if (fingerprint){
    if (!clients[fingerprint]){
      clients[fingerprint] = {
        "visits": 0,
        "lastPage": null
      }
    }
    clients[fingerprint].visits++;
  }
  else {
    detectAdmin(req);
  }

  if (admins.length > 0){
    announceToAdmin();
  }
}

function announceToAdmin(){
  admins.forEach((admin, i) => {
    sendMessage(admin, clients);
  })
}

function getIDFromRequest(req){
  return req.headers["sec-websocket-key"];
}

function detectAdmin(req){
  const token = req.url.split("token=")[1];
  const id = getIDFromRequest(req);

  // todo, validate this properly....
  const tokenValid = (token) => {
    return token ? true : false;
  }

  if (tokenValid){
    wss.clients.forEach((client, i) => {
      if (client.id === id){ admins.push(client); }
    });
  }
}

function getFingerPrint(req){
  return req.url.split("fingerprint=")[1];
}

function getLocation(req){
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip)
  return "uk"
}

function handleMessage(message){
  console.log("received message")
  const data = JSON.parse(message);
  console.log(data)
  if (data.type === "admin-connection"){
    detectAdmin(data.body);
  }

}

function sendMessage(client, message){
  client.send(JSON.stringify(message));
}



module.exports = wss;
