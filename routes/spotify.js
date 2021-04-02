var express = require("express");
var router = express.Router();

const request = require("request");

const token = process.env.token;

router.get("/", function(req, res, next) {
  const username = req.query.username;
  console.log(username);
  res.render("index");
});
