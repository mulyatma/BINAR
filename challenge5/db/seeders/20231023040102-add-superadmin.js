"use strict";

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        name: "Super Admin",
        email: "superadmin@gmail.com",
        encryptedPassword: bcrypt.hashSync("superadmin123", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "SUPERADMIN",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
