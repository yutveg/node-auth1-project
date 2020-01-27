module.exports = {
  register,
  login,
  getUserList,
  findBy
};

const db = require("../database/userdata-config.js");

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

function register(newUser) {
  return db("users").insert(newUser);
}

function login(credentials) {}

function getUserList() {}
