//By default, `LocalStrategy` expects to find credentials
// in parameters named username and password
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

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
