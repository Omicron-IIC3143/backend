/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.addColumn('Projects', 'tags', Sequelize.TEXT);
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.removeColumn('Projects', 'tags');
	}
};
