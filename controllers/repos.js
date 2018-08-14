require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
var db = require('../models');

//GET /repos
router.get('/', function(req, res) {
  if (req.user) {
    db.user.find({
      where: {githubid: parseInt(req.user.githubid)}
    }).then(function(dbUser) {
      axios.get(`https://api.github.com/users/${dbUser.username}/repos`).then(function(response) {
        res.render('repos/all', {repos: response.data});
      });
    });
  } else {
    var string = encodeURIComponent(true);
    res.redirect(`/?toast=${string}`);
  }
});

//GET /repos/:id
router.get('/:id', function(req, res) {
  db.gitrepo.findOne({
    where: {gitid: req.params.id}
  }).then( function(repo){
    db.timelog.findAll({
      where: {
        gitrepoId: repo.id}
      }).then(function(repolog){
        let totalTime = 0;
        repolog.forEach(repo => {
          totalTime += repo.min;
        });
        res.render('repos/show', {repo: repo, timelogs: repolog, totalTime})
      })
  })
});

//POST /repos/:id
router.post('/:id', function(req, res) {
  db.gitrepo.findOrCreate({
    where: {
      gitid: req.body.gitid,
      reponame: req.body.reponame
    },
  }).spread((gitrepo, created) => {
      plain: true
    })
  res.sendStatus(200);
});

module.exports = router;
