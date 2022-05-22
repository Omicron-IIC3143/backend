/* eslint-disable no-unused-vars */
'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
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
	User.init({
		 name: DataTypes.STRING,
		email: DataTypes.STRING,
		rut: DataTypes.STRING,
		password: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN,
		money: DataTypes.FLOAT,
		picture: DataTypes.TEXT,
		description: DataTypes.TEXT
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};