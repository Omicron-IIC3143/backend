'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Funding extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			Funding.belongsTo(models.Project, {
				foreignKey: 'projectId',
			});
			Funding.belongsTo(models.User, {
				foreignKey: 'userId',
			});
		}
	}
	Funding.init({
		userId: DataTypes.INTEGER,
		projectId: DataTypes.INTEGER,
		amount: DataTypes.FLOAT
	}, {
		sequelize,
		modelName: 'Funding',
	});
	return Funding;
};