'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        fields: ['id']
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        fields: ['username']
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sobrenome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        fields: ['email']
      },
      celular: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        fields: ['celular']
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nascimento: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        fields: ['created-at']
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        fields: ['updated_at']
      },
      status: {
        allowNull: false,
        type: Sequelize.TINYINT,
        defaultValue: "1",
      },
      perfilPhoto: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      googleId: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email_validate_hash: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email_as_validated: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      remember_token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      public_user: {
        allowNull: true,
        defaultValue: 1,
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};