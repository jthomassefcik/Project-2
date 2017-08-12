var passport = require('passport-local');

module.exports = function(app) {

//By default, `LocalStrategy` expects to find credentials
// in parameters named username and password

//passport.use(new LocalStrategy({
app.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'user_password'
},
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { console.log("passport error"); return done(err); }
      if (!user) { console.log("passport - user did not authenticate!"); return done(null, false); }
      if (!user.verifyPassword(password)) { console.log("passport - password did not authenticate!");return done(null, false); }
      console.log("passport - Welcome User!");
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

}
