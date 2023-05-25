"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      //async way of encrypting password
      if (err) throw "Error in salt generation";
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) throw "Error in hash generation";
        user.password = hash;
        user.save();
      });
    });
    //sync way of encrpyting password
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(user.password, salt);
    // user.passwrod = hash;

    //Note : async way is better than sync
  });
  return User;
};
