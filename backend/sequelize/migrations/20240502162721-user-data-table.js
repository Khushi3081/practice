'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable("user",{
        uuid:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        firstName:{
          type:Sequelize.STRING,
          allowNull:false
        },
        lastName:{
          type:Sequelize.STRING,
          allowNull:false
        },
        Email:{type:Sequelize.STRING,
          allowNull:false
        },
        Password:{
          type:Sequelize.STRING,
          allowNull:false
        },
          created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
        deleted_at: { type: Sequelize.Sequelize.DATE, allowNull: true },
      
      })})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('user', { transaction: t });
    });
  }
};
