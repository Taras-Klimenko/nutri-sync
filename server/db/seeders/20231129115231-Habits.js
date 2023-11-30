/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Habits', [
      {
        clientId: 1,
        title: 'Ведение дневника питания',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Навыки осознанного питания',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Достаточное количество овощей и фруктов',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Наличие в рационе всех пищевых продуктов',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Наличие основных приемов пищи',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Носить перекус с собой',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Промежутки между едой 3-4 часа',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Минимальное количество животных жиров',
        isCompleted: false,
      },
      {
        clientId: 1,
        title: 'Минимальное количество добавленного сахара',
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
