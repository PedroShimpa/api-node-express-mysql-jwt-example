'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventos_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  eventos_users.init({
    evento_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    adminstrador: DataTypes.TINYINT,
    accepted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'eventos_users',
  });
  return eventos_users;
};