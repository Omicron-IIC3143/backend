'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING
			},
			rut: {
				type: Sequelize.STRING
			},
			password: {
				type: Sequelize.STRING
			},
			isAdmin: {
				type: Sequelize.BOOLEAN
			},
			money: {
				type: Sequelize.FLOAT
			},
			picture: {
				type: Sequelize.TEXT
			},
			description: {
				type: Sequelize.TEXT
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
	// eslint-disable-next-line no-unused-vars
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	}
};