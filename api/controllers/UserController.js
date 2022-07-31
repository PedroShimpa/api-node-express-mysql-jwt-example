require("dotenv").config();
const { sequelize, QueryTypes } = require('sequelize');
const bcrypt = require("bcrypt");
var models = require('../../models')
const User = models.User;
const jwt = require('jsonwebtoken');
const messages = require('../../messages.json');
const { newUserMail } = require('../mails/newUserMail');
const UsersRepository = require("../repositories/UsersRepository")();

module.exports = () => {
  const controller = {};

  controller.getAllUsers = async (req, res) => {
    data = await User.findAll({ where: { status: 1 }, attributes: ['username', 'id'] })
    return res.status(200).json(data)
  }

  controller.userLogin = async (req, res) => {
    try {

      localizaEmail = await User.findAll({
        where: {
          email: req.body.email
        },
        attributes: ['senha', 'id']
      });
    } catch (e) {
      return res.status(500).send('Erro no servidor!')
    }
    if (localizaEmail.length === 0) return res.status(404).send(messages.userLocalizeError)
    if (localizaEmail.length != 0 && req.body.senha) {
      senhaDoBanco = localizaEmail[0].senha

      const id = localizaEmail[0].id;
      enviaToken = await bcrypt.compare(req.body.senha, senhaDoBanco);
      if (enviaToken) {
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 90000
        });
        return res.status(201).json(token);
      }
      return res.status(500).json({ message: messages.dadosLoginIsInvalid });
    }
    return res.status(500).json({ message: messages.usersNotExists });
  }

  controller.getUserById = async (req, res) => {
    var token = req.headers["authorization"];
    var chavePrivada = process.env.SECRET;
    verifyToUser = jwt.verify(token, chavePrivada, { algorithm: 'HS256' });
    id = verifyToUser.id;
    user = await User.findAll({
      where: {
        id: id,
      },
      attributes: ['nome', 'sobrenome', 'username', 'nascimento', 'email']
    });
    if (user) { return res.status(201).send(user) };

    return res.status(500).json({ message: messages.usersNotExists });
  }

  controller.newUser = async (req, res) => {
    nome = req.body.nome
    sobrenome = req.body.sobrenome
    email = req.body.email
    // nascimento = req.body.nascimento.split('/').reverse().join('-')
    senha = req.body.senha
    username = req.body.username
    try {
      const user = await User.create({
        username: username,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
      });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(user.senha, salt);
        id = user.id;
        salvaUsuario = user.save();
        if (salvaUsuario) {
          mailSend = newUserMail(email);
          if (mailSend) {
            const token = jwt.sign({ id }, process.env.SECRET, {
              expiresIn: 9000
            });
            return res.status(201).json(token);
          }
          return res.status(404).send(messages.undefinedMail)
        }
        return res.status(500).send({ error: messages.registerError })
      }
      return res.status(500).send({ error: messages.registerError })
    }
    catch (e) {
      return res.status(500).send(e);
    }
  }

  controller.getUserBySearch = async (req, res) => {
    dados = await UsersRepository.getUserBySearch(req.headers.search);
    if (dados.length == 0) {
      return res.status(404).send(messages.noUser)
    }
    return res.status(201).send(dados);
  }

  controller.resetPassword = async (req, res) => {
    email = req.body.email
    resetPassword = UsersRepository.resetPassword(email);
  }

  return controller;
}