var express = require('express');
var router = express.Router();
let outdoorCtrl = require("../controllers/outdoors");
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user, });
});
router.get("/outdoor", outdoorCtrl.outdoors)
router.post("/outdoor/new", outdoorCtrl.create)
router.post("/outdoor/delete/:id/", outdoorCtrl.deleteEv)

// list all events in the stay-connected
router.get('/stay_connected/all_events', outdoorCtrl.allevents)

// adding the selected event
  router.post("/outdoor/my-upcoming-event/:id/", outdoorCtrl.addGoingEvent)

// upcoming events for the user
router.get('/outdoor/events/upcoming-events', outdoorCtrl.upcoming)


//oauth routes
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
