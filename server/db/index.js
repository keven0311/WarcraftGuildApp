const db = require("./database");
const User = require("./models/User");
const Guild = require("./models/Guild");
const Member = require("./models/Member");

Guild.hasMany(Member);
Member.belongsTo(Guild);

module.exports = {
  db,
  User,
  Guild,
  Member,
};
