var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");


passport.use(new Strategy(
  function(username, password, cb) {
    db.User.findOne({where:{user_id:username}}).then(function(user) {
      if (!user) { return cb(null, false); }
      if (user.user_password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    db.User.findOne({where:{id:id}}).then(function ( user) {
      cb(null, user);
    });
  });



app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


app.use(express.static("./public"));

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());


require("./routes/html-routes.js")(app,passport);

db.sequelize.sync({force:true}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
