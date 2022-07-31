require("dotenv").config();
const { Sequelize, sequelize, QueryTypes, fn, col } = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
var models = require('../../models')
const jwt = require('jsonwebtoken');
const messages = require('../../messages.json');
const User = models.User;


module.exports = () => {
    const UsersRepository = {};

    UsersRepository.getUserBySearch = async (search) => {
   

            return await User.findAll({
                where: {
                    [Op.or]: [
                        {
                            
                            nome: {
                                [Op.like]: '%'+search+'%'
                            }
                        }, {
                            
                            sobrenome: {
                                [Op.like]: '$'+search+'%'
                            }
                        }, {
                            
                            username: {
                                [Op.like]: '%'+search+'%'
                            }
                        }, {
                         
                            email: {
                                [Op.like]: '%'+search+'%'
                            }
                        }
                    ]
                },
                attributes: [
                    'id', 'nome', 'sobrenome', 'username'
                ],
            })
         

    }
        
        return UsersRepository;
    }