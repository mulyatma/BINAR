"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("Cars", [
      {
        image: "./images/car25.min.jpg",
        rentPerDay: 200000,
        capacity: 2,
        description:
          "Electric speed-sensitive variable-assist pwr steering. Steel side-door impact beams.",
        availableAt: "2022-03-23T15:49:05.563Z",
      },
      {
        image: "./images/car01.min.jpg",
        rentPerDay: 400000,
        capacity: 2,
        description: "Electric speed-sensitive variable-assist pwr steering.",
        availableAt: "2022-03-23T15:49:05.563Z",
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
