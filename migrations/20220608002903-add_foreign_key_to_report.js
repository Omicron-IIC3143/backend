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
		await queryInterface.addConstraint('Reports', {
			fields: ['projectId'],
			type: 'foreign key',
			name: 'project-report_fk_relation',
			references: { //Required field
				table: 'Projects',
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
		await queryInterface.removeConstraint('Reports', 'project-report_fk_relation');
	},
};
