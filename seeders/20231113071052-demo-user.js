"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "john",
          password:
            "$2a$12$/Y1/x7qj07D5VfiDKUjJ/uPdgB1fS6PpkpoYxOMTzHrt/vmm2fPh6", // Gantilah dengan kata sandi yang di-hash
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "jane",
          password:
            "$2a$12$/Y1/x7qj07D5VfiDKUjJ/uPdgB1fS6PpkpoYxOMTzHrt/vmm2fPh6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
