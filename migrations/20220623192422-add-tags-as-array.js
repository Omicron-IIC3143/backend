/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.addColumn('Projects', 'tags', {
			type: Sequelize.ARRAY(Sequelize.STRING),
		});
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Projects', 'tags', {
			type: Sequelize.ARRAY(Sequelize.STRING),
		});
	}
};
