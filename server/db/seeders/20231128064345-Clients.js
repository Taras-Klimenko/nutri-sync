/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [
      {
        id: 1,
        firstName: 'Жожо',
        lastName: 'Смит',
        birthday: new Date('1970-10-23'),
        paidTill: new Date('2023-10-20'),
        phoneNumber: '123456',
      },
      {
        id: 2,
        firstName: 'Додик',
        lastName: 'Смит',
        birthday: new Date('1970-10-23'),
        paidTill: new Date('2023-10-20'),
        phoneNumber: '654321',
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
