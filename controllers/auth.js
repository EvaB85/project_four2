require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('../config/passportConfig.js');
var db = require('../models');

//GET /auth
router.get('/', (req, res) => {
  console.log('This is the user' + req.user)
    res.render('/')
});

//GET /auth/logout
router.get('/logout', function(req, res) {
  req.logout();
  passport.user = null;
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/');
      }
    });
  }
});

//GET /auth/github
router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/repos');
  });

  router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
      res.render('profile', { user: req.user });
  });


  module.exports = router;
