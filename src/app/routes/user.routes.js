const routes = require('express').Router();
const UserController = require('../controllers/UserController');

routes.post('/user/register', UserController.register);

module.exports = routes;
