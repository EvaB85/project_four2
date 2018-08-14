'use strict';
module.exports = (sequelize, DataTypes) => {
  var gitrepo = sequelize.define('gitrepo', {
    gitid: DataTypes.INTEGER,
    reponame: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  gitrepo.associate = function(models) {
    models.gitrepo.belongsTo(models.user);
    models.gitrepo.hasMany(models.timelog);
  };
  return gitrepo;
};
