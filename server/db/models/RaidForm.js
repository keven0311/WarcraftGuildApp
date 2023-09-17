require("dotenv").config();
const Sequelize = require("sequelize");
const db = require("../database");

const RaidForm = db.define("raidform", {
  time: {
    type: Sequelize.DATE,
    // allowNull: true,
  },
  groupOne: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
  },
  groupTwo: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
  },
  groupThree: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
  },
  groupFour: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
  },
  raidCharactersId: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = RaidForm;
