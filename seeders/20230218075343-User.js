const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        uuid: "837e8d66-fa34-41da-abd7-894d8751f9ab",
        name: "karera",
        firstName: "karera",
        lastName: "fabien",
        phone: "0987654459",
        email: "fabien@gmail.com",
        password:
          "$2b$12$XtA/qhfMFqDoEpIYelANXe11B/PPjbc0uz3ftZK4ShCyehOyjuwkm",
        passwordResetCode: "",
        gender: "male",
        updatedAt: "2023-09-10T10:12:15.007Z",
        createdAt: "2023-09-10T10:12:15.007Z",
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
