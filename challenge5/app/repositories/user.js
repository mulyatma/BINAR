const { User } = require("./../models");

exports.create = (payload) => {
  return User.create(payload);
};

exports.findUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};

exports.findByPk = (id) => {
  return User.findByPk(id);
};
