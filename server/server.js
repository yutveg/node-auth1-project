const express = require("express");
const cors = require("cors");
const server = express();
const apiRouter = require("../api/router.js");
const session = require("express-session");
const dbConnection = require("../database/userdata-config.js");
const KnexSessionStore = require("connect-session-knex")(session);

const sessionConfig = {
  name: "cookie",
  secret: process.env.SESSION_SECRET || "keep secret",
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 5
  })
};

server.use(session(sessionConfig));
server.use(express.json());
server.use(cors());
server.use(Logger);
server.use("/api", apiRouter);

function Logger(req, res, next) {
  console.log({
    method: req.method,
    body: req.body,
    URL: req.originalUrl
  });
  next();
}

module.exports = server;
