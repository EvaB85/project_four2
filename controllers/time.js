require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('../config/passportConfig.js');
var db = require('../models');
const fs = require('fs');

// POST /time/:id
router.post('/:id', function(req, res) {
  db.gitrepo.findOne({
    where: {id: req.params.id}
  }).then(function(repo){
    db.timelog.create({
      min: req.body.min,
      date: req.body.date,
      gitrepoId: req.params.id
    }).then(function(time) {
      console.log("HITTING TIME...");
      res.redirect('/repos/' + repo.gitid);
    }).catch(function(err) {
       console.log(err);
    });
  })
});


module.exports = router;
