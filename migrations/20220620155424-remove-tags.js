/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.removeColumn('Projects', 'tags', {
			type: Sequelize.TEXT,
		});
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.addColumn('Projects', 'tags', {
			type: Sequelize.TEXT,
		});
	}
};
