const db = require("./database");
const User = require("./models/User");
const Guild = require("./models/Guild");
const Character = require("./models/Character");

Guild.hasMany(Character);
Character.belongsTo(Guild);
Character.belongsTo(User);

module.exports = {
  db,
  User,
  Guild,
  Character,
};
