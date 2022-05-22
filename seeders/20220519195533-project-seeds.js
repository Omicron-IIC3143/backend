/* eslint-disable no-unused-vars */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Projects', [{
			name: 'Teleton',
			description: 'Esta es la descripcion del proyecto Teleton',
			picture: 'foto de teleton',
			company: 'Teleton S.A',
			topic: 'Ayuda social',
			currentAmount: 1000000,
			goalAmount: 54679020,
			currentState: 0,
			deadlineTime: 0,
			date: new Date(),
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'Colecta Social',
			description: 'Esta es la descripcion del proyecto de Colecta Social',
			picture: 'foto de colecta social',
			company: 'Colecta Social S.A',
			topic: 'Ayuda social',
			currentAmount: 723000,
			goalAmount: 4917210,
			currentState: 0,
			deadlineTime: 0,
			date: new Date(),
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'Un Techo para Chile',
			description: 'Esta es la descripcion del proyecto Un Techo para Chile',
			picture: 'foto de un techo para chile',
			company: 'Techo para Chile ltda',
			topic: 'Ayuda social',
			currentAmount: 50900,
			goalAmount: 5613499,
			currentState: 0,
			deadlineTime: 0,
			date: new Date(),
			createdAt: new Date(),
			updatedAt: new Date()
		},]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Projects', null, {});
	}
};