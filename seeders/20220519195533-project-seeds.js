/* eslint-disable no-unused-vars */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Projects', [{
			name: 'Teleton',
			description: 'El Teletón o Telemaratón (composición de Televisión y Maratón) es un evento benéfico televisado, \
			en el que se intercalan diversas presentaciones artísticas y de entretenimiento que se realiza actualmente en diferentes \
			países con el fin de recaudar fondos para distintas causas sociales.',
			pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Logo_Telet%C3%B3n.svg/1024px-Logo_Telet%C3%B3n.svg.png',
			company: 'Teleton S.A',
			topic: 'Ayuda social',
			currentAmount: 1000000.0,
			goalAmount: 54679020.0,
			currentState: 'accepted',
			date: new Date(),
			tags: ['Medico'],
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 2,
		},
		{
			name: 'Colecta Social',
			description: 'La Colecta Anual de Cáritas es una oportunidad privilegiada de encuentro solidario. \
			Hoy, más que nunca, nos reunimos como comunidad creyente para promover el compromiso en nuestra sociedad \
			y brindar oportunidades a los hermanos más pobres y excluidos de nuestro país.',
			pictureUrl: 'https://fundacioncuentaconnosotros.org/wp-content/uploads/Campana-Alcancia-Solidaria.jpg',
			company: 'Colecta Social S.A',
			topic: 'Ayuda social',
			currentAmount: 723000.0,
			goalAmount: 4917210.0,
			currentState: 'pending',
			date: new Date(),
			tags: ['Colecta'],
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 2,
		},
		{
			name: 'Un Techo para Chile',
			description: 'Buscamos mejorar las condiciones de vivienda y hábitat a través del diseño, \
			gestión y construcción de proyectos de vivienda, acceso a servicios básicos e infraestructura comunitaria, \
			en acción conjunta entre pobladores y voluntarios.',
			pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_TECHO_Chile.jpg',
			company: 'Techo para Chile ltda',
			topic: 'Ayuda social',
			currentAmount: 50900.0,
			goalAmount: 5613499.0,
			currentState: 'accepted',
			date: new Date(),
			tags: ['Vivienda'],
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 3,
		},]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Projects', null, {});
	}
};