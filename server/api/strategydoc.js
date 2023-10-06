const express = require("express");
const router = express.Router();

const { StrategyDoc } = require("../db");

router.get("/:guildId", async (req, res, next) => {
  try {
    const doc = await StrategyDoc.findAll({
      where: {
        guildId: req.params.guildId,
      },
    });
    res.json(doc);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
