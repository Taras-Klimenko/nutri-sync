module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Curators',
      [
        {
          login: 'Maurisfames4',
          name: 'Penatibusorci',
          email: 'Aliquetlectus',
          password: 'Venenatisfeugiat',
          isAdmin: true,
        },
        // {
        //     login: 'Maurisfames1',
        //     name: 'Penatibusorci1',
        //     email: 'Aliquetlectus1',
        //     password: 'Venenatisfeugiat1',
        //     isAdmin: true,
        // },
        // {
        //     login: 'Maurisfames2',
        //     name: 'Penatibusorci2',
        //     email: 'Aliquetlectus2',
        //     password: 'Venenatisfeugiat2',
        //     isAdmin: true,
        // },
      ],

      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Curators', null, {});
  },
};
