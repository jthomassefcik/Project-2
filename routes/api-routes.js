var db = require("../models");

module.exports=function(app,passport){

    app.get("/api/getUser", function(req, res) {
        var userid=req.user.dataValues.id
        db.Loan.findAll({where:{UserId:userid}}).then(function(data){
            res.json(data);
        });
      });


      app.post("/api/newLoan", function(req, res) {
        var newLoan={
            name: req.body.name,
            loan_type: req.body.loan_type,
            balance: req.body.balance,
            interest_rate: req.body.interest,
            minimum_Payment: req.body.minimum_Payment,
            UserId:req.user.dataValues.id
        }
        db.Loan.create(newLoan)
        .then(function(data){
            res.json(data);
        })
        .catch(function(err){
            res.json(err);
        })
      });




      app.post("/api/delete", function(req, res) {
          db.Loan.destroy({where:{id:req.body.id}}).then(function(data){
              res.json(data);
          });
      });

      app.post("/api/update", function(req, res) {
        var updateLoan={
            name: req.body.name,
            loan_type: req.body.loan_type,
            balance: req.body.balance,
            interest_rate: req.body.interest,
            minimum_Payment: req.body.minimum_Payment,
        }
        db.Loan.update(updateLoan,{where:{id:req.body.id}}).then(function(data){
            res.json(data);
        });
    });

}