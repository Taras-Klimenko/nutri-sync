const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parameter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
  }
  Parameter.init(
    {
      height: DataTypes.FLOAT,
      weight: DataTypes.FLOAT,
      chest: DataTypes.FLOAT,
      waist: DataTypes.FLOAT,
      hips: DataTypes.FLOAT,
      BMI: DataTypes.FLOAT,
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Parameter',
    }
  );
  return Parameter;
};
