const routes = require('express').Router();

const authMiddlewares = require('../middleware/auth');

const SessionController = require('../controllers/SessionController');

const userRoutes = require('./user.routes');

routes.use(userRoutes);

routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
