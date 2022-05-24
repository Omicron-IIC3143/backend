/* eslint-disable no-unused-vars */
'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Reports', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.TEXT
			},
			description: {
				type: Sequelize.TEXT
			},
			picture: {
				type: Sequelize.TEXT
			},
			projectId: {
				type: Sequelize.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Reports');
	}
};