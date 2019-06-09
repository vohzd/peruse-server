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
