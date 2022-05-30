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
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		rut: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		money: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: 0,
		},
		picture: DataTypes.TEXT,
		description: DataTypes.TEXT
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};