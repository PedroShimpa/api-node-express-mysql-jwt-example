const {
  validateUser
} = require('../middlewares/validators/createUsersValidator');
const messages = require('../../messages.json')

const { checkLogin, asLogged } = require('../middlewares/LoginMiddleware')


module.exports = app => {
  const controller = require('../controllers/UserController')();

  app.route('/api/usuario/novo')
    .post(validateUser, controller.newUser);

  app.route('/api/check/login')
    .get(asLogged);

  app.route('/api/usuario/login')
    .post(controller.userLogin);

  app.route('/api/usuario/perfil')
    .get(checkLogin, controller.getUserById);

  app.route('/api/usuario/buscar')
    .get(checkLogin, controller.getUserBySearch);

  app.route('/api/usuarios')
    .get(checkLogin, controller.getAllUsers);
}