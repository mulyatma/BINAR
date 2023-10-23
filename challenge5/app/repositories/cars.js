const { Cars, User } = require("../models");
const { Op } = require("sequelize");

exports.getListCars = () => {
  return Cars.findAll({
    attributes: { exclude: ["createdBy", "updatedBy", "deletedBy"] },
  });
};

exports.getListCarsByCapacity = (holdingCapacity) => {
  return Cars.findAll(
    { where: { capacity: { [Op.gte]: holdingCapacity } } },
    { attributes: { exclude: ["createdBy", "updatedBy", "deletedBy"] } }
  );
};

exports.findByPk = (id) => {
  return Cars.findByPk(id, {
    include: [
      { model: User, as: "created" },
      { model: User, as: "updated" },
      { model: User, as: "deleted" },
    ],
    attributes: { exclude: ["createdBy", "updatedBy", "deletedBy"] },
  });
};

exports.create = (payload, userId) => {
  return Cars.create({ ...payload, createdBy: userId });
};

exports.update = (id, payload, userId) => {
  return Cars.update(
    { ...payload, updatedBy: userId },
    { where: { id }, returning: true, paranoid: false }
  );
};

exports.destroy = (id) => {
  return Cars.destroy({ where: { id } });
};
