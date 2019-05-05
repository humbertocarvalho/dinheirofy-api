const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserDao = require('../infra/user-dao');

const auth = require('../auth');

module.exports = server => {
  // Register User
  server.post('/register', (req, res, next) => {
    const { email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        // Hash PasswordCustomer
        try {
          new UserDao().create({
            email,
            password: hash
          });
          res.send(201);res.set('x-access-token', token);
          next();
        } catch (err) {
          return next(new errors.InternalError(err.message));
        }
      });
    });

    return next();
  });

  // Auth User
  server.post('/auth', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      // Authenticate User
      const user = await auth.authenticate(email, password);

      // Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m'
      });

      const { iat, exp } = jwt.decode(token);

      // Respond with token
      res.set('x-access-token', token);
      res.send(200, { iat, exp, token });
      next();
    } catch (error) {
      // User unauthorized
      return next(new errors.UnauthorizedError(error));
    }
  });
};
