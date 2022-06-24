/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Reports', [{
			title: 'Teleton esta con un buen progreso.',
			description: 'Mediante las donaciones obtenidas se han recaudado $19.000.001 en las primeras horas.',
			pictureUrl: 'https://img.asmedia.epimg.net/resizer/YUrWEd-2UTLSrdIQouzNcsukEtc=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/QFXQBLFUANO7LKRURTE7ZXNL6E.jpg',
			projectId: 1,
			createdAt: new Date(2022, 5, 21),
			updatedAt: new Date()
		},
		{
			title: 'Colecta avanza de forma lenta.',
			description: 'Por culpa de la pandemia menos gente sale a las calles a donar y ser parte de esta colecta \
			les pedimos incentiven a la gente a salir y donar.',
			pictureUrl: 'https://araucanianoticias.cl/wp-content/uploads/2016/09/FOTO-colecta-down-sur-1.jpg',
			projectId: 2,
			createdAt: new Date(2021, 1, 5),
			updatedAt: new Date()
		},
		{
			title: 'Colecta esta agarrando mas vuelo.',
			description: 'Luego de los desafios que se acercaron a nosotros por parte de la \
			pandemia, nosotros nos encontramos con una gran necesidad de ayuda',
			pictureUrl: 'https://araucanianoticias.cl/wp-content/uploads/2016/09/FOTO-colecta-down-sur-1.jpg',
			projectId: 2,
			createdAt: new Date(2021, 2, 5),
			updatedAt: new Date()
		}]);
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Reports', null, {});
	}
};
