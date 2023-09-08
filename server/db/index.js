const db = require("./database");
const User = require("./models/User");
const Guild = require("./models/Guild");
const Character = require("./models/Character");

Guild.hasMany(Character);
User.hasMany(Character);
Character.belongsTo(Guild);
Character.belongsTo(User);
Guild.belongsTo(User, {
  foreignKey: "ownerEmail",
  targetKey: "email",
});

module.exports = {
  db,
  User,
  Guild,
  Character,
};
