const express = require("express");
const router = express.Router();
const Member = require("../models/member");

// Getting all
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:id", getMember, (req, res) => {
  res.send(res.member);
});

// Creating one
router.post("/", async (req, res) => {
  const members = new Member({
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    age: req.body.age,
    subscribeDate: req.body.subscribeDate,
    profilePic: req.body.profilePic,
  });
  try {
    const newMember = await members.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/:id", getMember, async (req, res) => {
  if (req.body.name != null) {
    res.member.name = req.body.name;
  }
  if (res.member.age != null) {
    res.member.age = req.body.age;
  }
  if (res.member.address != null) {
    res.member.address = req.body.address;
  }

  if (res.member.contact != null) {
    res.member.contact = req.body.contact;
  }

  if (res.member.profilePic != null) {
    res.member.profilePic = req.body.profilePic;
  }

  try {
    const updateMember = await res.member.save();
    res.json(updateMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting one
router.delete("/:id", getMember, async (req, res) => {
  try {
    await res.member.remove();
    res.json({ message: "Deleted Member Successfuly" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMember(req, res, next) {
  let member;
  try {
    member = await Member.findById(req.params.id);
    if (member == null) {
      return res.status(404).json({ message: "Cannot find member!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.member = member;
  next();
}

module.exports = router;
