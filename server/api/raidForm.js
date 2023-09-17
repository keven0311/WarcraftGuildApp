const express = require("express");
const router = express.Router();

const { Guild, Character, RaidForm } = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    const raidForm = await RaidForm.findOne({
      where: { guildId: req.params.id },
    });
    if (raidForm) {
      res.status(200).json(raidForm);
    } else {
      res.status(404).json("Form not found!");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newRaidForm = await RaidForm.create(req.body);
    res.status(201).json("Form created!");
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
