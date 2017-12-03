// standard expressjs server with socket.io bindings

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

//const config = require("./config.js");

let allVisitorData = {};

app.set("port", (process.env.PORT || 1337));

app.get("*", (req, res) => {
  res.send("app is running....");
});

io.on("connection", (socket) => {
  socket.on("clientConnected", (data) => {
    allVisitorData[socket.id] = data;
    io.emit("informDashboard", allVisitorData);
  });
  socket.on("clientClickedLink", (data) => {
    allVisitorData[socket.id] = data;
    io.emit("informDashboard", allVisitorData);
  });
  socket.on("disconnect", () => {
    delete allVisitorData[socket.id];
    io.emit("informDashboard", allVisitorData);
  });
});

http.listen(app.get("port"), () => {
  console.log(`listening on ${app.get("port")}`);
});
