const Sequelize = require("sequelize");
const db = require("../database");

const StrategyDoc = db.define("strategyDoc", {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  raid: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = StrategyDoc;
