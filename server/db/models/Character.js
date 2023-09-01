require("dotenv").config();
const Sequelize = require("sequelize");
const db = require("../database");

const Character = db.define("Character", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  server: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  characterClass: {
    type: Sequelize.ENUM(
      "Death Knight",
      "Demon Hunter",
      "Druid",
      "Evoker",
      "Hunter",
      "Mage",
      "Monk",
      "Paladin",
      "Priest",
      "Rogue",
      "Shaman",
      "Warlock",
      "Warrior"
    ),
  },
  race: {
    type: Sequelize.ENUM(
      "Human",
      "Dwarf",
      "Night Elf",
      "Gnome",
      "Draenei",
      "Worgen",
      "Pandaren",
      "Dracthyr",
      "Orc",
      "Undead",
      "Tauren",
      "Troll",
      "Blood Elf",
      "Goblin"
    ),
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 70,
    validate: {
      min: 0,
      max: 70,
    },
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Character;
