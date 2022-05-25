/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [{
			name: 'vicho',
			rut: '123',
			email:'vicho@uc.cl',
			password: 'vicho',
			isAdmin: true,
			money: 0,
			picture: 'hello',
			description: 'description',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'anto',
			rut: '123',
			email:'antoo@uc.cl',
			password: 'anto',
			isAdmin: true,
			money: 0,
			picture: 'hello',
			description: 'description',
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};