/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Foundings', [{
			id: 1,
			userId: 2,
			projectId: 1,
			amount: 100.0,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: 2,
			userId: 1,
			projectId: 3,
			amount: 1000.0,
			createdAt: new Date(),
			updatedAt: new Date()
		},]);
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Foundings', null, {});
	}
};
