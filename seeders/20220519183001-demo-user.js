/* eslint-disable no-unused-vars */
'use strict';
const bcrypt = require('bcryptjs');

function hashPassword(password) {
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

module.exports = {
	up: (queryInterface, Sequelize) => {

		return queryInterface.bulkInsert('Users', [{
			id: 1,
			name: 'vicho',
			rut: '123',
			email:'vicho@uc.cl',
			password: hashPassword('vicho'),
			isAdmin: true,
			money: 0,
			picture: 'hello',
			description: 'description',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			id: 2,
			name: 'anto',
			rut: '123',
			email:'antoo@uc.cl',
			password: hashPassword('anto'),
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