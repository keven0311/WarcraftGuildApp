const express = require("express");
const router = express.Router();

const { Character } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const character = await Character.findAll();
    res.json(character);
  } catch (err) {
    next(err);
  }
});

router.get("/name/:name", async (req, res, next) => {
  try {
    const character = await Character.findOne({
      where: { name: req.params.name },
    });
    res.json(character);
  } catch (err) {
    next(err);
  }
});

router.get("/id/:id", async (req, res, next) => {
  try {
    const character = await Character.findOne({
      where: { id: req.params.id },
    });
    res.json(character);
  } catch (err) {
    next(err);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const userCharacters = await Character.findAll({
      where: { userId: req.params.id },
    });
    res.json(userCharacters);
  } catch (error) {
    next(error);
  }
});

router.get("/guild/:id", async (req, res, next) => {
  try {
    const guildCharacters = await Character.findAll({
      where: { guildId: req.params.id },
    });
    res.json(guildCharacters);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, server, characterClass, race, level, contact, description } =
      req.body;
    const exsistCharacter = await Character.findOne({
      where: { name: name, server: server },
    });
    if (!exsistCharacter) {
      const newCharacter = await Character.create(req.body);
      res.status(201).json("Character created!");
      console.log("Character created");
    } else {
      res.status(400).json("Character already exsist!");
      console.log("Character already exsist!");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:server/:name", async (req, res, next) => {
  try {
    const { name, server } = req.params;
    const deleteCharacter = await Character.findOne({
      where: { name: name, server: server },
    });
    await deleteCharacter.destroy();
    res.json("Character deleted!");
  } catch (err) {
    next(err);
  }
});

router.put("/:server/:name", async (req, res, next) => {
  try {
    const { name, server } = req.params;
    const editCharacter = await Character.findOne({
      where: { name: name, server: server },
    });
    if (editCharacter) {
      await editCharacter.update(req.body);
      res.status(201).json("Character updated!");
    } else {
      return res.status(404).json("Character not found!");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
