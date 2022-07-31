'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eventos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Eventos.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    status: DataTypes.TINYINT,
    user_id: DataTypes.BIGINT,
    data_prevista: DataTypes.DATE,
    hora_prevista: DataTypes.DATE,
    valor_estimado: DataTypes.DECIMAL(10, 2),
    divisao_igual: DataTypes.BOOLEAN,
    qnt_maxima_convidados: DataTypes.INTEGER,
    front_photo: DataTypes.STRING,
    acesso: DataTypes.STRING,
    acesso_hash: DataTypes.STRING,
    acesso_senha: DataTypes.STRING,
    allow_pix: DataTypes.TINYINT,
    pix: DataTypes.STRING,
    endereco: DataTypes.TEXT,
    endereco_numero: DataTypes.INTEGER,
    endereco_allow_numero: DataTypes.TINYINT,
    endereco_complemento: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Eventos',
    tableName: 'eventos',
  });
  return Eventos;
};