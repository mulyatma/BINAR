"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Cars", "createdBy", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    });
    await queryInterface.addColumn("Cars", "updatedBy", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    });
    await queryInterface.addColumn("Cars", "deletedBy", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    });
    await queryInterface.addColumn("Cars", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
