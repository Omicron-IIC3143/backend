/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.addConstraint('Fundings', {
			fields: ['userId'],
			type: 'foreign key',
			name: 'user-fundings_fk_relation',
			references: { //Required field
				table: 'Users',
				field: 'id'
			}
		});
		await queryInterface.addConstraint('Fundings', {
			fields: ['projectId'],
			type: 'foreign key',
			name: 'project-fundings_fk_relation',
			references: { //Required field
				table: 'Projects',
				field: 'id'
			}
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.removeConstraint('Fundings', 'project-fundings_fk_relation');
		await queryInterface.removeConstraint('Fundings', 'user-fundings_fk_relation');
	}
};
