require("dotenv").config();
const Sequelize = require("sequelize");
const db = require("../database");

const Guild = db.define("guild", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  region: {
    type: Sequelize.ENUM("US", "Asia", "EU", "Korea", "Taiwan", "China"),
    allowNull: false,
  },
  server: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Guild;
