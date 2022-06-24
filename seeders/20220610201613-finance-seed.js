/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Fundings', [{
			userId: 3,
			projectId: 1,
			amount: 100.0,
			createdAt: new Date(2022, 5, 20),
			updatedAt: new Date()
		},
		{
			userId: 2,
			projectId: 3,
			amount: 1000.0,
			createdAt: new Date(2021, 1, 5),
			updatedAt: new Date()
		},
		{
			userId: 4,
			projectId: 3,
			amount: 990.0,
			createdAt: new Date(2021, 0, 15),
			updatedAt: new Date()
		},
		{
			userId: 6,
			projectId: 3,
			amount: 6789.0,
			createdAt: new Date(2021, 1, 4),
			updatedAt: new Date()
		},
		{
			userId: 5,
			projectId: 3,
			amount: 900.0,
			createdAt: new Date(2020, 1, 5),
			updatedAt: new Date()
		},
		{
			userId: 5,
			projectId: 4,
			amount: 10.0,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			userId: 9,
			projectId: 4,
			amount: 5000.0,
			createdAt: new Date(2021, 1, 5),
			updatedAt: new Date()
		},
		{
			userId: 7,
			projectId: 4,
			amount: 8000.0,
			createdAt: new Date(),
			updatedAt: new Date()
		},]);
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Fundings', null, {});
	}
};
