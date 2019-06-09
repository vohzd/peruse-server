const express                             = require("express");

const router                              = express.Router();

router.get("/sites", async (req, res, next) => {
    setTimeout(async () => {
      return await res.json({ "sites": "none" })
    }, 1500)
  },
  (err, req, res, next) => {
    return res.json(err);
  }
);

module.exports = router;
