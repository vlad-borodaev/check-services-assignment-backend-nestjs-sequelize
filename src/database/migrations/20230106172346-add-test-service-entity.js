'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('TestServices', {
			id: {
				allowNull: false,
				primaryKey: true,
				unique: true,
				type: Sequelize.INTEGER,
				autoIncrement: true,
			},
			url: {
				allowNull: false,
				type: Sequelize.STRING(1024)
			},
			priority: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deleted_at: {
				allowNull: true,
				type: Sequelize.DATE
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('TestServices');
	}
};
