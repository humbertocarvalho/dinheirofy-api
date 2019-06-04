const routes = require('express').Router();
const SessionController = require('../controllers/SessionController');
routes.post('/session/auth', SessionController.auth);

module.exports = routes;
