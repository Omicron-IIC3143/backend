module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Projects', [{
			name: 'Proyecto de Ejemplo',
			description: 'Esta es la descripcion del proyecto de ejemplo',
			picture: 'foto de ejemplo',
			company: 'Compañia de ejemplo',
			topic: 'topico de ejemplo',
			currentAmount: 0,
			goalAmount: 0,
			currentState: 0,
			deadlineTime: 0,
			date: new Date(),
			createdAt: new Date(),
			updatedAt: new Date()
		}]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Projects', null, {});
	}
};