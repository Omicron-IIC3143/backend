/* eslint-disable no-unused-vars */
'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Founding extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	Founding.init({
		userId: DataTypes.INTEGER,
		projectId: DataTypes.INTEGER,
		amount: DataTypes.FLOAT
	}, {
		sequelize,
		modelName: 'Founding',
	});
	return Founding;
};