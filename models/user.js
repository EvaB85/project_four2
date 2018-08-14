'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    githubid: DataTypes.INTEGER,
    accesstoken: DataTypes.STRING,
    //ADDED
    username: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    models.user.hasMany(models.gitrepo);
  };
  return user;
};
