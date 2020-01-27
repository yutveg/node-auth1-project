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

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome back ${user.username}.` });
      } else {
        res.status(401).json({ error: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/users", (req, res) => {
  if (req.headers.authorization) {
    Users.findBy(req.headers.authorization)
      .first()
      .then(user => {
        console.log(user);
        if (user && bc.compareSync(req.headers.authorization, user.username)) {
          Users.getUserList();
        } else {
          res.status(401).json({ you: "shall not pass!!1" });
        }
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  } else {
    res.status(400).json({ error: "No headers detected" });
  }
});

module.exports = router;
