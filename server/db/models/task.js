const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Curator, { foreignKey: 'curatorId' });
    }
  }
  Task.init(
    {
      text: DataTypes.STRING,
      deadline: DataTypes.DATE,
      isCompleted: DataTypes.BOOLEAN,
      curatorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
