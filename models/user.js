'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    nascimento: DataTypes.DATE,
    googleId: DataTypes.STRING,
    remember_token: DataTypes.STRING,
    remember_token: DataTypes.BOOLEAN
  },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    });
  return User;
};