const express = require("express");
const bc = require("bcryptjs");
const router = express.Router();
const Users = require("./model.js");
const restricted = require("./middleware/restricted.js");

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
        req.session.loggedIn = true;
        res.status(200).json({ message: `Welcome back ${user.username}.` });
      } else {
        res.status(401).json({ error: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/users", restricted, (req, res) => {
  Users.getUserList()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
