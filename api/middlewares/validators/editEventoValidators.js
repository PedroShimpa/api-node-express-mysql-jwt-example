const { check, validationResult } = require('express-validator');
messages = require('../../../messages.json')
const MoedaOption = require('./Options/MoedaOption');

exports.validateEditEvento = [
    check('evento_id')
        .escape()
        .not()
        .isEmpty()
        .bail(),

    check('titulo')
        .escape()
        .not()
        .isEmpty()
        .withMessage(messages.tituloNotEmpty)
        .isLength({ min: 3, max: 255 })
        .withMessage(messages.tituloLenght)
        .bail(),

    check('descricao')
        .escape()
        .not()
        .isEmpty()
        .withMessage(messages.descricaoNotEmpty)
        .isLength({ max: 560 })
        .withMessage(messages.descricaoLenght)
        .bail(),

    check('divisao_igual')
        .isBoolean()
        .bail(),

    check('valor_estimado')
        .isCurrency([MoedaOption])
        .withMessage(messages.valorEstimadoFormat)
        .bail(),

    check('data_prevista')
        .not()
        .isEmpty()
        .withMessage(messages.dataPrevistaNotEmpty)
        .bail(),

    check('hora_prevista')
        .bail(),

    check('qnt_maxima_convidados')
        .bail(),

    check('acesso')
        .isBoolean()
        .bail(),

    check('acesso_senha')
        .isLength({ max: 155 })
        .withMessage(messages.accesSenhaLenght)
        .bail(),

    check('allow_pix')
        .isBoolean()
        .bail(),

    check('pix')
        .isLength({ max: 155 })
        .withMessage(messages.pixMaxLenght)
        .bail(),

    check('endereco')
        .escape()
        .isLength({ max: 255 })
        .withMessage(messages.enderecoLenght)
        .bail(),

    check('endereco_allow_numero')
        .isBoolean()
        .escape()
        .bail(),

    check('endereco_numero')
        .escape()
        .bail(),

    check('endereco_complemento')
        .escape()
        .isLength({ max: 50 })
        .withMessage(messages.enderecoComplementoMaxLenght)
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];