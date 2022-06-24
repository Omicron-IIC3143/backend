'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			// define association here
			Project.belongsTo(models.User, {
				foreignKey: 'userId',
			});
			Project.hasMany(models.Reports, {
				foreignKey: 'projectId',
			});
			Project.hasMany(models.Funding, {
				foreignKey: 'projectId',
			});
		}
	}
	Project.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		pictureUrl: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		company: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		topic: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		currentAmount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		goalAmount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		currentState: {
			type: DataTypes.STRING,
			defaultValue: 'pending',
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		tags: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
		userId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		sequelize,
		modelName: 'Project',
	});
	return Project;
};