require("dotenv").config();
const { sequelize, QueryTypes, fn, col } = require('sequelize');
const bcrypt = require("bcrypt");
var models = require('../../models')
const jwt = require('jsonwebtoken');
const messages = require('../../messages.json');
const Eventos = models.Eventos;
const eventos_users = models.eventos_users;
const User = models.User;

User.hasMany(Eventos, { foreignKey: 'user_id' })
Eventos.belongsTo(User, { foreignKey: 'user_id' })
eventos_users.belongsTo(Eventos, { foreignKey: 'evento_id' })
eventos_users.belongsTo(User, { foreignKey: 'user_id' })

module.exports = () => {
    const EventosRepository = {};

    EventosRepository.addNewUserToEvento = async (data) => {
        return await eventos_users.create(data)
    }

    EventosRepository.getEventoFromHomePageByUserId = async (userId) => {
        return await Eventos.findAll({
            include: [{
                model: User,
                where: { id: userId },
                required: true,
                attributes: ['nome', 'sobrenome', 'id'],
            }],
            where: {
                user_id: userId,
                status: 1,
            },
            attributes: ['id', 'titulo', 'descricao', [fn('date_format', col('Eventos.createdAt'), '%d/%m/%Y'), 'createdAt']],
        });
    }

    EventosRepository.getEventoById = async (evento_id) => {
        try {
            return await Eventos.findByPk(evento_id, {
                attributes: ['id',
                    'titulo',
                    'user_id',
                    'divisao_igual',
                    'valor_estimado',
                    'acesso',
                    'acesso_hash',
                    'status_evento',
                    'endereco',
                    'endereco_numero',
                    'endereco_allow_numero',
                    'qnt_maxima_convidados',
                    'descricao',
                    [fn('date_format', col('Eventos.createdAt'), '%d/%m/%Y'), 'createdAt'],
                    [fn('date_format', col('Eventos.data_prevista'), '%d/%m/%Y'), 'data_prevista'],

                ]
            });
        } catch (e) {
            return;
        }
    }

    EventosRepository.editEvento = async (data, userId) => {
        evento_id = data.evento_id
        titulo = data.titulo
        descricao = data.descricao
        valor_estimado = data.valor_estimado
        if (data.divisao_igual)
            divisao_igual = 1
        qnt_maxima_convidados = data.qnt_maxima_convidados
        data_prevista = data.data_prevista.split('/').reverse().join('-')
        acesso = 0
        if (data.acesso)
            acesso = 1
        acesso_senha = data.acesso_senha
        allow_pix = 0
        if (data.allow_pix)
            allow_pix = 1
        pix = data.pix
        endereco = data.endereco
        endereco_numero = data.endereco_numero
        endereco_allow_numero = data.endereco_allow_numero
        endereco_complemento = data.endereco_complemento
        try {
            insertBanco = {
                user_id: userId,
                titulo: titulo,
                descricao: descricao,
                valor_estimado: valor_estimado,
                divisao_igual: divisao_igual,
                data_prevista: data_prevista,
                qnt_maxima_convidados: qnt_maxima_convidados,
                acesso: acesso,
                acesso_senha: acesso_senha,
                allow_pix: allow_pix,
                pix: pix,
                endereco: endereco,
                endereco_numero: endereco_numero,
                endereco_allow_numero: endereco_allow_numero,
                endereco_complemento: endereco_complemento,
            };
            getEvento = await Eventos.update(
                insertBanco,
                { where: { id: evento_id } }
            );
            if (getEvento)
                return true;
            return;
        }
        catch (e) {
            return;
        }
    }

    EventosRepository.newEvento = async (data, userId) => {
        titulo = data.titulo
        descricao = data.descricao
        valor_estimado = data.valor_estimado
        divisao_igual = 0
        if (data.divisao_igual)
            divisao_igual = 1
        qnt_maxima_convidados = data.qnt_maxima_convidados
        data_prevista = data.data_prevista.split('/').reverse().join('-')
        acesso = 0
        if (data.acesso)
            acesso = 1
        acesso_senha = data.acesso_senha
        allow_pix = 0
        if (data.allow_pix)
            allow_pix = 1
        pix = data.pix
        endereco = data.endereco
        endereco_numero = data.endereco_numero
        endereco_allow_numero = data.endereco_allow_numero
        endereco_complemento = data.endereco_complemento
        try {
            insertBanco = {
                user_id: userId,
                titulo: titulo,
                descricao: descricao,
                valor_estimado: valor_estimado,
                divisao_igual: divisao_igual,
                data_prevista: data_prevista,
                // hora_prevista: hora_prevista,
                qnt_maxima_convidados: qnt_maxima_convidados,
                acesso: acesso,
                acesso_senha: acesso_senha,
                allow_pix: allow_pix,
                pix: pix,
                endereco: endereco,
                endereco_numero: endereco_numero,
                endereco_allow_numero: endereco_allow_numero,
                endereco_complemento: endereco_complemento,
            };
            const evento = await Eventos.create(insertBanco);

            if (evento)
                return evento.id;
            return;
        }
        catch (e) {
            return;
        }
    }

    EventosRepository.removeEventoByEventoId = async (evento_id, userId) => {
        deleteEvento = await Eventos.update(
            { status: 0 },
            { where: { id: evento_id, user_id: userId } }
        );
        console.log(deleteEvento)
        if (deleteEvento == 1)
            return true;
        return;
    }

    EventosRepository.addParticipanteEvento = async (data) => {
        verificaSeExiste = await eventos_users.findAll({
            where: {
                user_id: data.user_id,
                evento_id: data.evento_id
            },
            attributes: ['user_id'],
        })
        if(verificaSeExiste.length != 0) {
            return 0;
        }
        return await eventos_users.create(data);
    }

    EventosRepository.getParticipanteEvento = async (evento_id) => {
        return await eventos_users.findAll({
            where:
            {
                evento_id: evento_id
            },
            attributes: [
                'user_id', [fn('date_format', col('eventos_users.createdAt'), '%d/%m/%Y'), 'createdAt']
            ],
            include: [{
                model: User,
                required: true,
                attributes: ['username', 'id'],
            }],
        })
    }

    return EventosRepository;
}