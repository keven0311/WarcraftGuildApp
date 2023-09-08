const express = require("express");
const router = express.Router();

const { Guild } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const guilds = await Guild.findAll();
    res.json(guilds);
  } catch (err) {
    next(err);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const guild = await Guild.findOne({
      where: { name: req.params.name },
    });
    res.json(guild);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, region, server } = req.body;
    const exsistGuild = await Guild.findOne({
      where: { name: name, region: region, server: server },
    });
    if (!exsistGuild) {
      const newGuild = await Guild.create(req.body);
      res.status(201).json("Guild created!");
    } else {
      res.status(400).json("Guild already exsist!");
      console.log("Guild already exsist!");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:name", async (req, res, next) => {
  try {
    const deleteGuild = await Guild.findOne({
      where: { name: req.params.name },
    });
    await deleteGuild.destroy();
    res.json(deleteGuild);
  } catch (err) {
    next(err);
  }
});

router.put("/:name", async (req, res, next) => {
  try {
    const editGuild = await Guild.findOne({
      where: { name: req.params.name },
    });
    if (editGuild) {
      await editGuild.update(req.body);
      res.status(201).json("Guild info updated!");
    } else {
      return res.status(404).json("Guild not found!");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
