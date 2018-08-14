require('dotenv').config();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var db = require("../models");

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  }, (accessToken, refreshToken, profile, cb) => {
    db.user.findOrCreate({
      //We do not need (line below) the github id - b/c we cannot do anything with id in this API - they enforce user name that are unique
      where: {githubid: profile.id },
      //ADDED username: profile.username###############bringing in this column and saving username
      defaults: {accesstoken: accessToken, username: profile.username}
    }).spread(function(user, created) {
      // console.log(user, created);
      //MIGHT NEED REVIEW B/C NO USERNAME HERE and profile.id IS STRING but we are parsing it in another file so it's working now
      return cb(null, {githubid: profile.id, accesstoken: accessToken})
    })
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

module.exports = passport
