// -- Create the table loan.
// -- name: name of the lender
// -- loan_type:  example - auto, mortgage, credit card
// -- principal:  loan outstanding balance (required)
// -- interest_rate:	loan interest rate
// -- minimum_Payment:  loan minimum payment

// -- user table has a 1 to many relationship to loan table

module.exports = function (sequelize, Datatypes){
    var Loan = sequelize.define("Loan",{
        name:{
            type: Datatypes.STRING,
            allowNull: false
        },
        loan_type: {
            type: Datatypes.String,
            allowNull: false
        },
        principal: {
            type: Datatypes.FLOAT,
            allowNull: false,
            validate: {
                isDecimal: true,
                min:1
            }
        },
        interest_rate: {
            type: Datatypes.FLOAT,
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 0.5,
                max: 100
            }
        },
        minimum_Payment: {
            type: Datatypes.FLOAT,
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 1
            }
        }
    });
    return Loan;
}