const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Curator, { foreignKey: 'curatorId' });
      this.hasMany(models.Parameter, { foreignKey: 'clientId' });
      this.hasMany(models.Habit, { foreignKey: 'clientId' });
      this.hasMany(models.ClientNote, { foreignKey: 'clientId' });
    }
  }
  Client.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      birthday: DataTypes.DATE,
      paidTill: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      curatorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Client',
    }
  );
  return Client;
};
