const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
  }
  Habit.init(
    {
      diary: DataTypes.BOOLEAN,
      eatingSkills: DataTypes.BOOLEAN,
      enoughVegetables: DataTypes.BOOLEAN,
      allNutrients: DataTypes.BOOLEAN,
      allMainMeals: DataTypes.BOOLEAN,
      haveSnack: DataTypes.BOOLEAN,
      mealInterval: DataTypes.BOOLEAN,
      minAnimalFats: DataTypes.BOOLEAN,
      minAddedSugar: DataTypes.BOOLEAN,
      enoughWater: DataTypes.BOOLEAN,
      enoughSleep: DataTypes.BOOLEAN,
      enoughDailyPlates: DataTypes.BOOLEAN,
      correctPlateSize: DataTypes.BOOLEAN,
      mealLeftovers: DataTypes.BOOLEAN,
      maintainNutrition: DataTypes.BOOLEAN,
      help: DataTypes.BOOLEAN,
      lessonsFromFailures: DataTypes.BOOLEAN,
      hungerAppetiteDiff: DataTypes.BOOLEAN,
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Habit',
    }
  );
  return Habit;
};
