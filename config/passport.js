const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_REDIRECT_URI
    },
    function(accessToken, refreshToken, profile, cb) {
      // a user has logged in with OAuth...
    }
  )
);
