/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.changeColumn('Projects', 'tags', {
			type: Sequelize.TEXT,
		});
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.changeColumn('Projects', 'tags', {
			type: Sequelize.ARRAY(Sequelize.TEXT)
		});
	}
};
