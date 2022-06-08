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
		await queryInterface.addConstraint('Projects', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'user-project_fk_relation',
			references: { //Required field
				table: 'Users',
				field: 'id'
			},
			onDelete: 'cascade',
		});
	},

	async down (queryInterface, Sequelize) {
		/**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
		await queryInterface.removeConstraint('Projects', 'user-project_fk_relation');
	},
};
