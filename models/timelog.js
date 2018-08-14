'use strict';
module.exports = (sequelize, DataTypes) => {
  var timelog = sequelize.define('timelog', {
    gitrepoId: DataTypes.INTEGER,
    min: DataTypes.INTEGER,
    date: DataTypes.STRING
  }, {});
  timelog.associate = function(models) {
    models.timelog.belongsTo(models.gitrepo);
  };
  return timelog;
};
