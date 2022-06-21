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
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'El usuario fue eliminado',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'vicho',
			rut: '123',
			email:'vicho@uc.cl',
			password: hashPassword('vicho'),
			isAdmin: true,
			money: 3000.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'desarrollador de backend',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'anto',
			rut: '123',
			email:'antoo@uc.cl',
			password: hashPassword('anto'),
			isAdmin: true,
			money: 200.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'desarrolladora de backend',
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};