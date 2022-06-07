/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		/**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
		await queryInterface.renameColumn( 'Users', 'picture', 'pictureUrl' );
		await queryInterface.renameColumn( 'Projects', 'picture', 'pictureUrl' );
		await queryInterface.renameColumn( 'Reports', 'picture', 'pictureUrl' );
	},

	async down (queryInterface, Sequelize) {
		/**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	}
};
