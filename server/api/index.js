const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/login", require("./login"));
// router.use("/signup", require("./signup"));
router.use("/guild", require("./guild"));
router.use("/member", require("./member"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
