/* eslint-disable no-unused-vars */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Projects', [{
			name: 'Teleton',
			description: 'Esta es la descripcion del proyecto Teleton',
			pictureUrl: 'foto de teleton',
			company: 'Teleton S.A',
			topic: 'Ayuda social',
			currentAmount: 1000000.0,
			goalAmount: 54679020.0,
			currentState: 'pending',
			deadlineTime: 0,
			date: new Date(),
			tags: 'tag-1,tag-2',
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 2,
		},
		{
			name: 'Colecta Social',
			description: 'Esta es la descripcion del proyecto de Colecta Social',
			pictureUrl: 'foto de colecta social',
			company: 'Colecta Social S.A',
			topic: 'Ayuda social',
			currentAmount: 723000.0,
			goalAmount: 4917210.0,
			currentState: 'pending',
			deadlineTime: 0,
			date: new Date(),
			tags: 'tag-1,tag-2,tag-3',
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 2,
		},
		{
			name: 'Un Techo para Chile',
			description: 'Esta es la descripcion del proyecto Un Techo para Chile',
			pictureUrl: 'foto de un techo para chile',
			company: 'Techo para Chile ltda',
			topic: 'Ayuda social',
			currentAmount: 50900.0,
			goalAmount: 5613499.0,
			currentState: 'pending',
			deadlineTime: 0,
			date: new Date(),
			tags: 'tag-1',
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 3,
		},]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Projects', null, {});
	}
};