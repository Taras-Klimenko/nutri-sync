/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Parameters', [{
      weight: 70,
      chest: 95,
      waist: 75,
      hips: 90,
      BMI: 22.5,
      clientId: 1,

    },
    {
      weight: 80,
      chest: 105,
      waist: 85,
      hips: 90,
      BMI: 23.5,
      clientId: 2,
 
    },], {});
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
