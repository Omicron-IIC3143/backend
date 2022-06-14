/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.removeColumn('Projects', 'deadlineTime');
	},

	async down (queryInterface, Sequelize) {
		return queryInterface.addColumn('Projects', 'deadlineTime', {
			type: Sequelize.INTEGER
		});
	}
};
