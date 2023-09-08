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
    await User.create({
      name: "kaichong lin",
      email: "kaichongapi@gmail.com",
      picture:
        "https://lh3.googleusercontent.com/a/AAcHTte43i3pnC31FO9xhlIOXXYQOaKpfNHoISCKcPl7-q3j=s96-c",
    });
    await Guild.create({
      name: "sampleGuild",
      region: "US",
      server: "illidan",
      description:
        "This is a sample guild description will show here in single guild view. OH YEAH!",
      announcement: "ATTENTION! THIS IS AN ANNOUNCEMENT!",
      ownerEmail: "kaichongapi@gmail.com",
    });
    await Guild.create({
      name: "Style",
      region: "US",
      server: "illidan",
      description:
        "This is top one Chinese guild in the US server! Join us if you have balls!",
      announcement:
        "We are raid 6 days every week to get into the Hall of Fame in the US server. Dont be late, hit harder, heal harder, tank better, kill bosses!",
      ownerEmail: "kaichongapi@gmail.com",
    });
    await Character.create({
      name: "character one",
      region: "us",
      server: "illidan",
      characterClass: "Death Knight",
      race: "Human",
      // level:   test see if its 70 by default
      contact: "memberone@gmail.com",
      description: "the first character ever",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "character two",
      region: "cn",
      server: "illidan",
      characterClass: "Rogue",
      race: "Orc",
      // level:   test see if its 70 by default
      contact: "membertwo@gmail.com",
      description: "second character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "character three",
      region: "eu",
      server: "illidan",
      characterClass: "Mage",
      race: "Orc",
      // level:   test see if its 70 by default
      contact: "memberthree@gmail.com",
      description: "3rd character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "character four",
      region: "kr",
      server: "illidan",
      characterClass: "Demon Hunter",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "4th character",
      guildId: 1,
      userId: 3,
    });
  } catch (err) {
    console.error(err.message);
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
