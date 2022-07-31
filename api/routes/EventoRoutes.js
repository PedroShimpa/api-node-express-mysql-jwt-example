const {
    validateEvento
} = require('../middlewares/validators/createEventoValidators');
const {
    validateEditEvento
} = require('../middlewares/validators/editEventoValidators');

const messages = require('../../messages.json')

const { checkLogin } = require('../middlewares/LoginMiddleware')

module.exports = app => {
    const controller = require('../controllers/EventosController')();

    app.route('/api/evento/novo')
        .post(checkLogin, validateEvento, controller.newEvento);

    app.route('/api/evento/editar')
        .post(checkLogin, validateEditEvento, controller.editEvento);

    app.route('/api/evento/home')
        .get(checkLogin, controller.getEventoFromHomePageByUserId);

    app.route('/api/evento/ver')
        .get(checkLogin, controller.getEventoById);

    app.route('/api/evento/remover')
        .delete(checkLogin, controller.deleteEventoById);

    app.route('/api/evento/participante/novo')
        .post(checkLogin, controller.addParticipantesEventos);
        
    app.route('/api/evento/participante/ver')
        .get(checkLogin, controller.verParticipantesEventos);
}