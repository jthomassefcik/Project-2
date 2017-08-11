var path = require("path");

var db = require("../models");


module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });



    app.post("/login",function(req,res){
        db.User.findOne({
            where:{user_password:req.body.Password,user_email:req.body.Email}
        }).then(function(data){
            if(data.length>0)
                res.json(true);
            else
                res.json(false);
        });
    });


    
    app.post("/createAccount",function(req,res){
        var newUser={
            user_id:req.body.Email,
            user_password:req.body.Password,
            user_first_name:req.body.firstName,
            user_email:req.body.Email
        }

        db.User.create(newUser).then(function(data){
            res.json(data);
        });
    });


}