const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send({ "message": "server booted" });
});

module.exports = router;
