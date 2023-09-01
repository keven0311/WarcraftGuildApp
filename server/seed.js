const { db, User, Guild, Character } = require("./db");

const seed = async () => {
  try {
    await db.sync({ force: true });
    await User.create({
      name: "admin",
      email: "admin@gmail.com",
      password: "1234",
    });
    await User.create({
      name: "SeedTestUser",
      email: "seedtestuser@gmail.com",
    });
    await Guild.create({
      name: "sampleGuild",
      region: "US",
      server: "Illidan",
    });
    await Character.create({
      name: "character one",
      server: "Illidan",
      characterClass: "Death Knight",
      race: "Human",
      // level:   test see if its 70 by default
      contact: "memberone@gmail.com",
      description: "the first character ever",
      guildId: 1,
    });
  } catch (err) {
    console.error(err);
  }
};

async function runSeed() {
  try {
    await seed();
    console.log("Seeding success!");
  } catch (err) {
    console.error("something went wrong when seeding!");
    console.error(err);
  } finally {
    db.close();
  }
}

runSeed();
