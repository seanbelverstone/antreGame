var bcrypt = require("bcrypt");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(
      password,
      this.password
    );
  };

  User.associate = function(models) {
    // Associating User with their characters
    // Also, when a user is deleted, their characters are also removed.
    User.hasMany(models.Character, {
      onDelete: "cascade"
    });
  }

  return User;
};