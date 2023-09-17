const { db, User, Guild, Character, RaidForm } = require("./db");

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
      name: "one",
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
      name: "two",
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
      name: "three",
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
      name: "four",
      region: "us",
      server: "illidan",
      characterClass: "Demon Hunter",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "4th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "five",
      region: "kr",
      server: "illidan",
      characterClass: "Mage",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "5th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "six",
      region: "cn",
      server: "illidan",
      characterClass: "Death Knight",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "6th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "seven",
      region: "cn",
      server: "illidan",
      characterClass: "Paladin",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "7th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "eight",
      region: "cn",
      server: "illidan",
      characterClass: "Rogue",
      race: "Human",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "8th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "nine",
      region: "cn",
      server: "illidan",
      characterClass: "Evoker",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "9th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "ten",
      region: "cn",
      server: "illidan",
      characterClass: "Hunter",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "10th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "eleven",
      region: "cn",
      server: "illidan",
      characterClass: "Shaman",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "11th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "twelve",
      region: "cn",
      server: "illidan",
      characterClass: "Death Knight",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "12th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "thirteen",
      region: "cn",
      server: "illidan",
      characterClass: "Warrior",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "13th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "fourteen",
      region: "cn",
      server: "illidan",
      characterClass: "Warlock",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "14th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "fifteen",
      region: "cn",
      server: "illidan",
      characterClass: "Druid",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "15th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "sixteen",
      region: "cn",
      server: "illidan",
      characterClass: "Monk",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "16th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "seventeen",
      region: "cn",
      server: "illidan",
      characterClass: "Mage",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "17th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "eighteen",
      region: "cn",
      server: "illidan",
      characterClass: "Warrior",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "18th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "nineteen",
      region: "cn",
      server: "illidan",
      characterClass: "Warrior",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "19th character",
      guildId: 1,
      userId: 3,
    });
    await Character.create({
      name: "twenty",
      region: "cn",
      server: "illidan",
      characterClass: "Monk",
      race: "Dwarf",
      // level:   test see if its 70 by default
      contact: "memberfour@gmail.com",
      description: "20th character",
      guildId: 1,
      userId: 3,
    });

    await RaidForm.create({
      time: new Date(),
      groupOne: [1, 2, 3, 4, 5],
      groupTwo: [6, 7, 8, 9, 10],
      groupThree: [11, 12, 13, 14, 15],
      groupFour: [16, 17, 18, 19, 20],
      raidCharactersId: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
      description: "first raid form ever",
      // guildName: "sampleGuild",
      guildId: 1,
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
