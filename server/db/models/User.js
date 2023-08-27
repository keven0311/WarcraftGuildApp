require("dotenv").config();
const Sequelize = require("sequelize");
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
