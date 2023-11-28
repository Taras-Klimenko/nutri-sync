const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  Note.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Note',
    }
  );
  return Note;
};
