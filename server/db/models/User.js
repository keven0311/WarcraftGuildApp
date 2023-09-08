require("dotenv").config();
const Sequelize = require("sequelize");
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  picture: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
