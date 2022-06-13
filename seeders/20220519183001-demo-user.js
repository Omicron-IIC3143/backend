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
			name: 'Deleted_user',
			rut: 'Deleted',
			email:'deleted@uc.cl',
			password: hashPassword('deleted'),
			isAdmin: true,
			money: 0,
			pictureUrl: 'No_Disponible',
			description: 'El usuario fue eliminado',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'vicho',
			rut: '123',
			email:'vicho@uc.cl',
			password: hashPassword('vicho'),
			isAdmin: true,
			money: 0,
			pictureUrl: 'hello',
			description: 'description',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'anto',
			rut: '123',
			email:'antoo@uc.cl',
			password: hashPassword('anto'),
			isAdmin: true,
			money: 0,
			pictureUrl: 'hello',
			description: 'description',
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};