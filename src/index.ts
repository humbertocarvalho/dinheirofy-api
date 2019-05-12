import restify from 'restify'
import mongoose from 'mongoose'
import config from '../config'
import corsMiddleware from 'restify-cors-middleware'
import Customer from './routes/customers'

class Index {
  public restify: restify.Server

  public constructor () {
    this.restify = restify.createServer()
    this.middlewares()
    this.database()
    this.routes()
    this.restify.listen(3000)
  }

  private middlewares (): void{
    const cors = corsMiddleware({
      origins: ['*'],
      allowHeaders: ['Authorization', 'x-access-token'],
      exposeHeaders: ['Authorization', 'x-access-token']
    })
    this.restify.use(restify.plugins.bodyParser())
    this.restify.pre(cors.preflight)
    this.restify.use(cors.actual)
  }

  private database (): void{
    mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true
    })
  }

  private routes (): void {
    const c = new Customer(this.restify)
    console.log(c)
    // require('./routes/customers')(this.restify)
    // require('./routes/users')(this.restify)
  }
}
export default new Index().restify

// Protect Routes
// server.use(
//   rjwt({
//     secret: config.JWT_SECRET
//   }).unless({
//     path: ['/auth']
//   })
// );
/*
server.listen(config.PORT, () => {

})

const db = mongoose.connection

db.on('error', err => console.log(err))

db.once('open', () => {
  require('./routes/customers')(server)
  require('./routes/users')(server)
  console.log(`Server started on port ${config.PORT}`)
})
*/
