const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
});

router.post("/register", (req, res) => {});

router.get("/users", (req, res) => {});

module.exports = router;
