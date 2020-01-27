const express = require("express");
const cors = require("cors");
const server = express();
const apiRouter = require("../api/router.js");

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
