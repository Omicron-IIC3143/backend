/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Fundings', [{
			userId: 3,
			projectId: 1,
			amount: 100.0,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			userId: 2,
			projectId: 3,
			amount: 1000.0,
			createdAt: new Date(),
			updatedAt: new Date()
		},]);
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Fundings', null, {});
	}
};
