'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("TestServices", [
            {
                url: "https://does-not-work.perfume.new",
                priority: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                url: "https://gitlab.com",
                priority: 4,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                url: "http://app.scnt.me",
                priority: 3,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                url: "https://offline.scentronix.com",
                priority: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("TestServices");
    }
};
