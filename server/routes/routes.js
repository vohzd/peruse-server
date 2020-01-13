const express = require("express");

const router = express.Router();

const routes = (io) => {

  io.on("connection", (socket) => {
    console.log("connection")
    //socket.emit("user-connected", { "status": "yes" });

    router.post("/listen", async (req, res) => {
      console.log("you are here...")
      socket.emit("user-action", { "status": "yes" });

      return res.json({
        message:
          "why do i always feel like, someone is watching me? https://www.youtube.com/watch?v=qQe_w-A9Y50"
      });
    });

    socket.on("connection", (something) => {
      console.log("something happened...")
    });



  });

  console.log(" you are here")

  router.get(
    "/sites",
    async (req, res, next) => {
      setTimeout(async () => {
        return await res.json({ sites: "none" });
      }, 1500);
    },
    (err, req, res, next) => {
      return res.json(err);
    }
  );



  return router;
}

module.exports = routes;
