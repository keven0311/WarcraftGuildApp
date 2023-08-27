require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db");

router.post("/", async (req, res, next) => {
  try {
    //login and authentication:
  } catch (err) {
    next(err);
  }
});

module.exports = router;
