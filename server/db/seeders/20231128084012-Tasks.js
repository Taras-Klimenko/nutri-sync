'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'Tasks',
        [
          {
            text: 'Cubiliatorquent',
            deadline: '1971-12-09',
            isCompleted: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            text: 'Velmi',
            deadline: '1971-12-09',
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            text: 'Pertaciti',
            deadline: '1971-12-09',
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
