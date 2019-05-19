import errors from 'restify-errors'
import bcrypt from 'bcryptjs'
import UserDao from '../infra/user-dao'
// import config from '../../config'
// import rjwt from 'restify-jwt-community'
import { Request, Response, Next } from 'restify'

class UserController {
  public async registrar (req: Request, res:Response, next:Next) : Promise<Response> {
    const { userName, name, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    try {
      new UserDao().create({
        userName,
        name,
        email,
        password: hash
      })
      next()
      return res.send(201)
    } catch (error) {
      next()
      return res.send(new errors.InternalError(error.message))
    }
  }
}
export default UserController
