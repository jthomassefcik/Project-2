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
        balance: {
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
    Loan.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Loan.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Loan;
}