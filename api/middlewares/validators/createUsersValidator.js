const { check, validationResult } = require('express-validator');
messages = require('../../../messages.json')
const sequelize = require('sequelize');
var models = require('../../../models')
const User = models.User;

exports.validateUser = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage(messages.usernameNotEmpty)
        .isLength({ min: 3, max: 50 })
        .withMessage(messages.usernameLenght)
        .custom(value => !/\s/.test(value))
        .withMessage(messages.usernameBlockChars)
        .custom(
            async function (value) {
                try {
                    $user = await User.findOne({ where: { username: value } })
                    if ($user)
                        return Promise.reject(messages.usernameUnique)

                } catch (e) {
                    console.log(e);
                }
            })
        .bail()
    ,

    check('nome')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage(messages.nomeNotEmpty)
        .isLength({ min: 3 })
        .withMessage(messages.nomeMinLenght)
        .bail(),

    check('sobrenome')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage(messages.sobrenomeNotEmpty)
        .isLength({ min: 3 })
        .withMessage(messages.sobrenomeMinLenght)
        .bail(),

    check('email')

        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage(messages.emailInvalid)
        .custom(
            async function (value) {
                try {
                    $user = await User.findOne({ where: { email: value } })
                    if ($user)
                        return Promise.reject(messages.emailInUse)

                } catch (e) {
                    console.log(e);
                }
            })
        .bail(),

    check('senha')
        .trim()
        .not()
        .isEmpty()
        .withMessage(messages.senhaNotEmpty)
        .isLength({ min: 3 })
        .withMessage(messages.senhaMinLenght)
        .bail(),

    // check('nascimento')
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .withMessage(messages.nascimentoNotEmpty)
    //     .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];