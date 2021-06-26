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
router.get("/:id", (req, res) => {});

// Creating one
router.post("/", async (req, res) => {
  const members = new Member({
    name: req.body.name,
    gender: req.body.gender,
    contact: req.body.contact,
    subscribeDate: req.body.subscribeDate,
  });
  try {
    const newMember = await members.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Updating one
router.patch("/:id", (req, res) => {});
// Deleting one
router.delete("/:id", (req, res) => {});

module.exports = router;
