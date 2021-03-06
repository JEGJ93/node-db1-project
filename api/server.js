const express = require("express");

const AccountRouter = require("../data/accounts/account-router.js")

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });

module.exports = server;
