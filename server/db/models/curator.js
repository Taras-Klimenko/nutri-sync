const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Curator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Client, { foreignKey: 'curatorId' });
      this.hasMany(models.Task, { foreignKey: 'curatorId' });
    }
  }
  Curator.init(
    {
      login: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Curator',
    }
  );
  return Curator;
};
