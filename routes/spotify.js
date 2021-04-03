var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const request = require("request");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const rootURL = "https://api.spotify.com/";

router.get("/", async function(req, res, next) {
  const username = req.query.username;

  console.log(username);

  await fetch("${rootURL}v1/me")
    .then(res => res.json())
    .then(userData => {
      res.render("spotify", { userData });
    });
});

module.exports = router;
