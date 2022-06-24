'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Reports extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			Reports.belongsTo(models.Project, {
				foreignKey: 'projectId'
			});
		}
	}
	Reports.init({
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		pictureUrl: DataTypes.TEXT,
		projectId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: 'Reports',
	});
	return Reports;
};