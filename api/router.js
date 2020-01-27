const express = require("express");
const bc = require("bcryptjs");
const router = express.Router();
const Users = require("./model.js");

router.post("/register", (req, res) => {
  const user = req.body;

  const hash = bc.hashSync(req.body.password, 8);

  user.password = hash;
  console.log(user);
  Users.register(user)
    .then(result => {
      res.status(201).json({ success: `Welcome aboard ${user.username}!` });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/login", (req, res) => {});

router.get("/users", (req, res) => {});

module.exports = router;
