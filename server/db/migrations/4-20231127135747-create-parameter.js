'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parameters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.FLOAT,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      chest: {
        type: Sequelize.FLOAT,
      },
      waist: {
        type: Sequelize.FLOAT,
      },
      hips: {
        type: Sequelize.FLOAT,
      },
      BMI: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('Parameters');
  },
};
