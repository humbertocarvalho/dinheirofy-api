const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const corsMiddleware = require('restify-cors-middleware');

const server = restify.createServer();

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization', 'x-access-token'],
  exposeHeaders: ['Authorization', 'x-access-token']
});

// Middleware
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

// Protect Routes
// server.use(
//   rjwt({
//     secret: config.JWT_SECRET
//   }).unless({
//     path: ['/auth']
//   })
// );

server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/users')(server);
  console.log(`Server started on port ${config.PORT}`);
});
