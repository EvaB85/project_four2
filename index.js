const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('./config/passportConfig.js');
const session = require('express-session');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({ secret: 'oauths are stupid', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.get('/',
//   function(req, res) {
//     res.render('home', { user.req.user });
//   });

app.get('/', (req, res) => {
  console.log('This is the user' + req.user)
    // res.render('/')

    res.json({
      githubid, accesstoken
    });
});

app.get('/login',
  function(req, res) {
    res.render('login')
  });

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("################## in the successful login callback ##################")
    // Successful authentication, redirect home.
    console.log("Now lets see what is attached to the req object");
    console.log(req.user);
    res.send('WHERE AM I?????????');
  });

  app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
      res.render('profile', { user: req.user });
  });

  app.get('*', (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });

  app.listen(3001, () => {
    console.log('Server gitting run on port 3001')
  });
