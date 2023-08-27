const express = require("express");
const router = express.Router();

const { User } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const existUser = await User.findOne({
      where: { email: email },
    });
    if (!existUser) {
      const newUser = await User.create(req.body);
      console.log("user created!");
      res.send(newUser);
    } else {
      res.send(existUser);
      console.log("user already exsist!");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
