const routes = require('express').Router();

const authMiddlewares = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
