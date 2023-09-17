const db = require("./database");
const User = require("./models/User");
const Guild = require("./models/Guild");
const Character = require("./models/Character");
const RaidForm = require("./models/RaidForm");

Guild.hasMany(Character, {
  foreignKey: "guildId",
  as: "characters",
});
User.hasMany(Character);
Character.belongsTo(Guild);
Character.belongsTo(User);
Guild.belongsTo(User, {
  foreignKey: "ownerEmail",
  targetKey: "email",
});

Guild.hasMany(RaidForm);
RaidForm.belongsTo(Guild);

module.exports = {
  db,
  User,
  Guild,
  Character,
  RaidForm,
};
