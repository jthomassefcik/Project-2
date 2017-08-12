// -- Create the table user.
// -- user_id:  user's id (required)
// -- user_password:  user's password (required)
// -- user_first_name: borrower's first name (required)
// -- user_last_name: borrower's last name (required)
// -- user_email:  borrower's email address

// -- user table has a 1 to many relationship to loan table

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    user_id:{
      type: DataType.STRING,
      allowNull: false
    },
    user_password:{
      type: DataType.STRING,
      allowNull: false
    },
    user_first_name:{
      type: DataType.STRING,
      allowNull: false
    },
    user_last_name:{
        type: DataType.STRING,
        allowNull: false
    },
    user_email:{
        type: DataType.STRING
    },
    user_extra_payment: {
      type: DataType.FLOAT,
      validate: {
          isDecimal: true
      }
    }
  });
  return User;
};