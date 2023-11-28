'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Clients',
            [
                {
                    firstName: 'SimonIqbal',
                    lastName: 'HassanHasan',
                    birthday: new Date('1988-05-02'),
                    paidTill: new Date('2005-08-11'),
                    phoneNumber: 208,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: 'HenryNawaz',
                    lastName: 'MohammedPhan',
                    birthday: new Date('1988-05-09'),
                    paidTill: new Date('2005-08-22'),
                    phoneNumber: 444,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: 'SureshNie',
                    lastName: 'XinDevi',
                    birthday: new Date('1988-05-11'),
                    paidTill: new Date('2005-08-12'),
                    phoneNumber: 888,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Clients', null, {});
    }
};
