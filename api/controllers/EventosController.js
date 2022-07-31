require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const messages = require('../../messages.json');
const EventosRepository = require('../repositories/EventosRepository')();

module.exports = () => {
    const controller = {};

    controller.getEventoFromHomePageByUserId = async (req, res) => {
        userId = getUserId(req.headers['authorization'])
        eventos = await EventosRepository.getEventoFromHomePageByUserId(userId)
        if (eventos.length === 0) return res.status(404).send(messages.notHaveEventos)
        if (eventos.length != 0) {
            return res.status(202).send(eventos);
        }
        return res.status(500).json({ message: messages.notHaveEventos });
    }

    controller.newEvento = async (req, res) => {
        userId = getUserId(req.headers['authorization'])
        const criaEvento = await EventosRepository.newEvento(req.body, userId)
        if (criaEvento) return res.status(201).json(criaEvento);
        return res.status(500).send({ error: messages.registerError })
    }

    controller.editEvento = async (req, res) => {
        userId = getUserId(req.headers['authorization'])
        const editaEvento = await EventosRepository.editEvento(req.body, userId)
        if (editaEvento) return res.status(201).send(messages.editedEvent);
        return res.status(500).send({ error: messages.errorOnEditEvento })
    }

    controller.getEventoById = async (req, res) => {
        const evento = await EventosRepository.getEventoById(req.headers.evento_id)
        if (evento) return res.status(201).send(evento);
        return res.status(500).send({ error: messages.errorOnFindEvento })
    }

    controller.addNewUserToEvento = async (req, res) => {
        userId = getUserId(req.headers['authorization'])
        const addParticipante = await EventosRepository.addNewUserToEvento(req.body.evento_id, req.body.participante_id)
        if (addParticipante) return res.status(201).send(messages.editedEvent);
        return res.status(500).send({ error: messages.errorOnEditEvento })
    }

    controller.deleteEventoById = async (req, res) => {
        userId = getUserId(req.headers["authorization"])
        const removeEvento = await EventosRepository.removeEventoByEventoId(req.body.evento_id, userId)
        if (removeEvento) return res.status(200).send(messages.eventDeleted)
        else
            return res.status(500).send(messages.errorOnDeletEvent)
    }

    controller.addParticipantesEventos = async (req, res) => {
        const addParticipante = await EventosRepository.addParticipanteEvento(req.body)
        if (addParticipante == 0)
            return res.status(500).send(messages.partipanteAlreadyExists)
        if (addParticipante) return res.status(201).send(messages.participanteCreated)
        else
            return res.status(500).send(messages.errorOnAddParticipantes)
    }

    controller.verParticipantesEventos = async (req, res) => {
        const participantes = await EventosRepository.getParticipanteEvento(req.headers.evento_id)
        if (participantes) return res.status(200).send(participantes)
        else
            return res.status(500).send(messages.errorOnGetParticipantes)
    }

    return controller;
}
function getUserId(token) {
    var chavePrivada = process.env.SECRET
    verifyToUser = jwt.verify(token, chavePrivada, { algorithm: 'HS256' })
    return verifyToUser.id
}