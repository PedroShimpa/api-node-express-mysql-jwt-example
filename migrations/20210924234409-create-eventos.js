'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull: true,
        type: Sequelize.TEXT('long')
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      data_prevista: {
        allowNull: true,
        type: Sequelize.DATE
      },
      hora_prevista: {
        allowNull: true,
        type: Sequelize.DATE
      },
      valor_estimado: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      divisao_igual: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      qnt_maxima_convidados: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      front_photo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      acesso: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "PRIVADO",
      },
      acesso_hash: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true,
      },
      acesso_senha: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      numero_compartilhamentos: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "0"
      },
      status_evento: {
        type: Sequelize.STRING,
        defaultValue: "EM PLANEJAMENTO",
      },
      allow_pix: {
        allowNull: false,
        type: Sequelize.TINYINT,
        defaultValue: "0",
      },
      pix: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      endereco: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      endereco_numero: {
        allowNull: true,
        type: Sequelize.TINYINT,
        defaultValue: '0',
      },
      endereco_allow_numero: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      endereco_complemento: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: "1",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('eventos');
  }
};