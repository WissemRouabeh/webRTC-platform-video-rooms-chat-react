const router = require("express").Router();

router.route("/").get((req, res) => {
  res.json("wissem");
});

module.exports = router;
