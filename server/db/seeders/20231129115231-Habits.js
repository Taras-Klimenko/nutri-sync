/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Habits', [
      {
        clientId: 1,
        title: 'Ведет дневник',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Бегает',
        isCompleted: false,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
