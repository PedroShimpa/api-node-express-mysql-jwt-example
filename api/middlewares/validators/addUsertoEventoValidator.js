const { check, validationResult } = require('express-validator');
messages = require('../../../messages.json')
const models = require('../../../models');
const eventos_users = models.eventos_users
const User = models.User
const Eventos = models.Eventos

exports.validateEvento = [
    check('user_id')
        .escape()
        .not()
        .isEmpty()
        .custom(async function (value) {
            try {
                $user = await User.findOne({ where: { email: value } })
                if (!$user)
                    return Promise.reject(messages.notUserToEvento)
            } catch (e) {
                return Promise.reject(messages.notUserToEvento)
            }
        })
        .custom(async function (value) {
            try {
                user = await eventos_users.findOne({ where: { user_id: value } })
                if (!user)
                    return Promise.reject(messages.userAlreadyIn)
            } catch (e) {
                return Promise.reject(messages.userAlreadyIn)
            }
        })
        .bail(),

    check('evento_id')
        .escape()
        .not()
        .isEmpty()
        .custom(async function (value) {
            try {
                evento = await Eventos.findOne({ where: { id: value } })
                if (evento)
                    return Promise.reject(messages.notFindEvento)
            } catch (e) {
                return Promise.reject(messages.notFindEvento)
            }
        })
        .bail(),

    check('administrador')
        .isBoolean()
        .not()
        .isEmpty()
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];