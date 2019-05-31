const routes = require('express').Router();
const UserController = require('../controllers/UserController');

routes.post('/user/register', UserController.register);
routes.get('/user/exists/:email', UserController.exists);

module.exports = routes;
