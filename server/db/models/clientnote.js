const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClientNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
  }
  ClientNote.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ClientNote',
    }
  );
  return ClientNote;
};
