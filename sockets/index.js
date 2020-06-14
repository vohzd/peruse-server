const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 1789 });
let clients = [];

wss.on("connection", (ws, req) => {
  const id = req.headers["sec-websocket-key"];
  ws.id = id;
  clients.push({
    id,
    location: getLocation(req)
  });
  detectAdmin(id, req);
});

function detectAdmin(id, req){
  const token = req.url.split("token=")[1];
  // todo, validate this properly....
  if (token){
    wss.clients.forEach((client, i) => {
      if (client.id === id){
        client.isAdmin = true;
        sendMessage(client, { "message": "hello ben" });
        sendMessage(client, clients);
      }
    });
  }
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
