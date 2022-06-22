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
			email:'anto@uc.cl',
			password: hashPassword('anto'),
			isAdmin: true,
			money: 200.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'desarrolladora de backend',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'pedro',
			rut: '123',
			email:'pedro@uc.cl',
			password: hashPassword('pedro'),
			isAdmin: false,
			money: 10000.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'CEO de la mejor aplicacion de Chile',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'Juan',
			rut: '123',
			email:'juan@uc.cl',
			password: hashPassword('juan'),
			isAdmin: false,
			money: 10000.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'Funcionario municipalidad de Colina',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'Diego',
			rut: '123',
			email:'diego@uc.cl',
			password: hashPassword('diego'),
			isAdmin: false,
			money: 10000.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'Emprendedor',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'mario',
			rut: '123',
			email:'mario@uc.cl',
			password: hashPassword('mario'),
			isAdmin: false,
			money: 10000.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'Busco financiar proyectos que ayuden en las afueras de Santiago',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'Santiago',
			rut: '123',
			email:'santiago@uc.cl',
			password: hashPassword('santiago'),
			isAdmin: false,
			money: 10000.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'Trabajador/estdiante',
			createdAt: new Date(),
			updatedAt: new Date()
		},{
			name: 'will smith',
			rut: '123',
			email:'will@uc.cl',
			password: hashPassword('will'),
			isAdmin: false,
			money: 10000.0,
			pictureUrl: 'https://feedback.seekingalpha.com/s/cache/b4/58/b4582f85a7033671b73bedbe8afafc47.png',
			description: 'Actor de Fresh Prince en busca de ayuda',
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};