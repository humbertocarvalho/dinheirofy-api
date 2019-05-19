import { Server } from 'restify'
import UserController from '../controllers/user-controller'
// import config from '../../config'
// import rjwt from 'restify-jwt-community'

class UserRoute {
  private restify: Server

  public constructor (server:Server) {
    this.restify = server
    const customerController = new UserController()
    this.restify.post('/user/register', customerController.registrar)
    this.restify.post('/user/auth', customerController.auth)
  }
}

export default UserRoute

// const errors = require('restify-errors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('../config');
// const UserDao = require('../infra/user-dao');

// const auth = require('../auth');

// module.exports = server => {
//   // Register User
//   server.post('/user/register', (req, res, next) => {
//     const { userName, name, email, password } = req.body;

//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(password, salt, async (err, hash) => {
//         // Hash PasswordCustomer
//         try {
//           new UserDao().create({
//             userName,
//             name,
//             email,
//             password: hash
//           });
//           res.send(201);
//           res.set('x-access-token', token);
//           next();
//         } catch (err) {
//           return next(new errors.InternalError(err.message));
//         }
//       });
//     });

//     return next();
//   });

//   // Auth User
//   server.post('/user/auth', async (req, res, next) => {
//     const { userName, password } = req.body;

//     try {
//       // Authenticate User
//       const user = await auth.authenticate(userName, password);

//       // Create JWT
//       const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
//         expiresIn: '15m'
//       });

//       const { iat, exp } = jwt.decode(token);

//       // Respond with token
//       res.set({ 'x-access-token': token });
//       res.send(200, { iat, exp, token });
//       next();
//     } catch (error) {
//       // User unauthorized
//       return next(new errors.UnauthorizedError(error));
//     }
//   });

//   // Verify if username/email had been taken
//   server.get('/user/exists/:username', async (req, res, next) => {
//     const user = await new UserDao().findByUsername(req.params.username);
//     res.json(!!user);
//     next();
//   });
// };
