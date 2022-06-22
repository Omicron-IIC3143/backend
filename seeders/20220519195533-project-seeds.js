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
			topic: 'ayuda social',
			currentAmount: 100000000.0,
			goalAmount: 54679020.0,
			currentState: 'accepted',
			date: new Date(2022, 5, 21),
			tags: ['ayuda social', 'discapacidad', 'discapacidad motora', 'discapacidad intelectual'],
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
			date: new Date(2023, 9, 10),
			tags: ['ayuda social', 'campamentos', 'alimento'],
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
			date: new Date(2021, 1, 5),
			tags: ['campamentos', 'ayuda social'],
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 3,
		},
		{
			name: 'Refrigeradores con comida Gratuita',
			description: 'Con el lema: "toma lo que necesites y deja lo que puedas" Toronto Community Fridges es un proyecto \
			que ha instalado refrigeradores y despensas en el exterior de diversas tiendas en Toronto. En estos spots, los vecinos \
			pueden colocar alimentos que estén en buen estado para que otras personas tomen lo que necesiten.',
			pictureUrl: 'https://themonopolitan.com/assets/img/post/monopolitan/proyectos%20sociales_toronto-community-fridges.jpg?ezimgfmt=ng:webp/ngcb80',
			company: 'Toronto Community Fridges',
			topic: 'Alimentacion',
			currentAmount: 10.0,
			goalAmount: 10000000.0,
			currentState: 'accepted',
			date: new Date(2025, 8, 12),
			tags: ['alimento', 'ayuda social', 'pobreza'],
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 9,
		},
		{
			name: 'Muebles hechos por refugiados',
			description: 'Cucula inicia con la historia de Malik, Moussa, Saidou, Maiga y Ali, 5 jóvenes africanos que decidieron \
			ir a Europa en busca de oportunidades, trabajo y futuro. Llegaron a tierras mediterráneas con espíritu y fé, pero sólo \
			encontraron hambre, fríos y rechazo.\n Cabizbajos, pero con la ilusión latente en sus corazones, los 5 jóvenes viajaron \
			hasta Berlín y fue entonces que encontraron la oportunidad de sus vidas cuando un colectivo de diseñadores los acogió para \
			darles vivienda y la oportunidad de desenvolverse profesionalmente creando una colección de muebles para el hogar.',
			pictureUrl: 'https://themonopolitan.com/assets/img/post/monopolitan/proyectos%20sociales_cucula.jpg?ezimgfmt=ng:webp/ngcb80',
			company: 'Berlin Design',
			topic: 'Reinserción',
			currentAmount: 12123456.0,
			goalAmount: 456000600.0,
			currentState: 'pending',
			date: new Date(2022, 9, 7),
			tags: ['vivienda', 'reinserción social', 'arte', 'agricola'],
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 7,
		},
		{
			name: 'Nececito Dinero',
			description: 'Soy un actor en busca del financiamiento de mi proxima pelicula',
			company: 'WS Company',
			topic: 'Entretenimiento',
			currentAmount: 0.0,
			goalAmount: 10000000.0,
			currentState: 'rejected',
			date: new Date(2023, 1, 10),
			tags: ['entretenimiento'],
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: 9,
		},]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Projects', null, {});
	}
};