'use strict';

/** @type {import('sequelize-cli').Migration} */
const roleData = [{
  uuid:1,
  roleName:"Admin"
},{
  uuid:2,
  roleName:"Customer"
}]
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("role",roleData);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('role', null, {});
  }
};
