const express = require("express");

const router = express.Router();

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

router.post("/listen", async (req, res) => {
  console.log("you rang?");
  console.log(req.body);
  return res.json({
    message:
      "why do i always feel like, someone is watching me? https://www.youtube.com/watch?v=qQe_w-A9Y50"
  });
});

module.exports = router;
