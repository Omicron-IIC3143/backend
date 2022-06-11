/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.addConstraint('Foundings', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'user-foundings_fk_relation',
			references: { //Required field
				table: 'Users',
				field: 'id'
			}
		});
		await queryInterface.addConstraint('Foundings', {
			fields: ['projectId'],
			type: 'foreign key',
			name: 'project-foundings_fk_relation',
			references: { //Required field
				table: 'Projects',
				field: 'id'
			}
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.removeConstraint('Foundings', 'project-foundings_fk_relation');
		await queryInterface.removeConstraint('Foundings', 'user-foundings_fk_relation');
	}
};
