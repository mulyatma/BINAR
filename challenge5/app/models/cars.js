"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "created",
      });
      this.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updated",
      });
      this.belongsTo(models.User, {
        foreignKey: "deletedBy",
        as: "deleted",
      });
    }
  }
  Cars.init(
    {
      image: DataTypes.STRING,
      rentPerDay: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      availableAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cars",
      paranoid: true,
    }
  );
  Cars.beforeCreate((cars) => (cars.id = uuidv4()));
  return Cars;
};
