'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn("user","roleId",{
    
      type:Sequelize.INTEGER,
      allownull:false,
      references: { model: 'role', key: 'uuid' }
    
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("user","roleId")
  }
};
