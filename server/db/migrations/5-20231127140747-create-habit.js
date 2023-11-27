'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Habits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      diary: {
        type: Sequelize.BOOLEAN,
      },
      eatingSkills: {
        type: Sequelize.BOOLEAN,
      },
      enoughVegetables: {
        type: Sequelize.BOOLEAN,
      },
      allNutrients: {
        type: Sequelize.BOOLEAN,
      },
      allMainMeals: {
        type: Sequelize.BOOLEAN,
      },
      haveSnack: {
        type: Sequelize.BOOLEAN,
      },
      mealInterval: {
        type: Sequelize.BOOLEAN,
      },
      minAnimalFats: {
        type: Sequelize.BOOLEAN,
      },
      minAddedSugar: {
        type: Sequelize.BOOLEAN,
      },
      enoughWater: {
        type: Sequelize.BOOLEAN,
      },
      enoughSleep: {
        type: Sequelize.BOOLEAN,
      },
      enoughDailyPlates: {
        type: Sequelize.BOOLEAN,
      },
      correctPlateSize: {
        type: Sequelize.BOOLEAN,
      },
      mealLeftovers: {
        type: Sequelize.BOOLEAN,
      },
      maintainNutrition: {
        type: Sequelize.BOOLEAN,
      },
      help: {
        type: Sequelize.BOOLEAN,
      },
      lessonsFromFailures: {
        type: Sequelize.BOOLEAN,
      },
      hungerAppetiteDiff: {
        type: Sequelize.BOOLEAN,
      },
      clientId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Clients' }, key: 'id' },
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Habits');
  },
};
