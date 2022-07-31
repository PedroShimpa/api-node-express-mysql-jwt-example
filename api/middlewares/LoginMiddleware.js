require("dotenv").config();
const jwt = require('jsonwebtoken');
messages = require('../../messages.json');

exports.checkLogin = (req, res, next) => {
    var token = req.headers["authorization"];
    var chavePrivada = process.env.SECRET;
    errors = false;
    try {
        jwt.verify(token, chavePrivada, { algorithm: 'HS256' });
    } catch {
        errors = true;
        return res.status(401).send(messages.notLoggedIn);
    }
    if(errors)  return res.status(401).send(messages.notLoggedIn);
    next();
};

exports.asLogged = (req, res) => {
    var token = req.headers["authorization"];
    var chavePrivada = process.env.SECRET;
    errors = false;
    try {
        jwt.verify(token, chavePrivada, { algorithm: 'HS256' });
    } catch {
        errors = true;
        return res.status(401).send(messages.notLoggedIn);
    }
    if(errors)  return res.status(401).send(messages.notLoggedIn);
    console.log('successo')
    return res.status(201).send('sucesso');
};