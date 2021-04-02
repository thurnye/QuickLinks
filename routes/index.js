var express = require('express');
var router = express.Router();
let outdoorCtrl = require("../controllers/outdoors")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/outdoor", outdoorCtrl.outdoors)
router.post("/outdoor/new", outdoorCtrl.create)
router.post("/outdoor/delete/:id/", outdoorCtrl.deleteEv)

module.exports = router;
