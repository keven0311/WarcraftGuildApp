const express = require("express");
const router = express.Router();

const { Member } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (err) {
    next(err);
  }
});

router.get("/:name", async (req, res, next) => {
  try {
    const member = await Member.findOne({
      where: { name: req.params.name },
    });
    res.json(member);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, server, characterClass, race, level, contact, description } =
      req.body;
    const exsistMember = await Member.findOne({
      where: { name: name, server: server },
    });
    if (!exsistMember) {
      const newMember = await Member.create(req.body);
      res.json(newMember);
    } else {
      res.json(exsistMember);
      console.log("Member already exsist!");
      throw new Error("Member already exsist!");
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:name:server", async (req, res, next) => {
  try {
    const { name, server } = req.params;
    const deleteMember = await Member.findOne({
      where: { name: name, server: server },
    });
    await deleteMember.destroy();
    res.json(deleteMember);
  } catch (err) {
    next(err);
  }
});

router.put("/:name:server", async (req, res, next) => {
  try {
    const { name, server } = req.params;
    const editMember = await Member.findOne({
      where: { name: name, server: server },
    });
    const updatedMember = await editMember.update(req.body);
    res.json(updatedMember);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
