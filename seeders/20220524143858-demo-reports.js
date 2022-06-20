/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Reports', [{
			title: 'teleton esta de pana',
			description: 'Esta es la descripcion del reporte Teleton',
			pictureUrl: 'foto del reporte teleton',
			projectId: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			title: 'colecta esta de pana',
			description: 'Esta es la descripcion del reporte colecta',
			pictureUrl: 'foto del reporte colecta',
			projectId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
		},]);
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Reports', null, {});
	}
};
