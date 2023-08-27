const { db, User } = require("./db");

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
