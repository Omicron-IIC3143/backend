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
		}
	}
	Project.init({
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		picture: DataTypes.TEXT,
		company: DataTypes.STRING,
		topic: DataTypes.STRING,
		currentAmount: DataTypes.FLOAT,
		goalAmount: DataTypes.FLOAT,
		currentState: DataTypes.STRING,
		deadlineTime: DataTypes.INTEGER,
		date: DataTypes.DATE
	}, {
		sequelize,
		modelName: 'Project',
	});
	return Project;
};