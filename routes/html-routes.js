var path = require("path");

var db = require("../models");


module.exports = function(app,passport) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });

      app.get("/newUser", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/newUser.html"));
      });

      app.get("/home", function(req, res) {
        if(req.user)
        res.sendFile(path.join(__dirname, "../public/home.html"));
        else
        res.sendFile(path.join(__dirname, "../public/index.html"));

      });



    app.post("/login",passport.authenticate('local', { failureRedirect: '/' }),function(req,res){
        res.json(true);
    });


    
    app.post("/createAccount",function(req,res){
        var newUser={
            user_id:req.body.Email,
            user_password:req.body.Password,
            user_first_name:req.body.firstName,
            user_last_name:req.body.lastName,
            user_email:req.body.Email
        }

        db.User.create(newUser).then(function(data){
            res.json(data);
        });
    });


}