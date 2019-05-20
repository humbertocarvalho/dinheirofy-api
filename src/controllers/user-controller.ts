import errors from 'restify-errors'
import bcrypt from 'bcryptjs'
import UserDao from '../infra/user-dao'
import jwt from 'jsonwebtoken'
import config from '../../config'
// import rjwt from 'restify-jwt-community'
import { Request, Response, Next } from 'restify'

class UserController {
  public async registrar (req: Request, res:Response, next:Next):Promise<Response> {
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

  public async auth (req:Request, res:Response, next:Next):Promise<Response> {
    const { userName, password } = req.body
    try {
      // Get user by userName
      const user = await new UserDao().findByUsername(userName)

      // Match Passwords
      bcrypt.compare(password, user.password, (err: Error, isMatch: boolean):Promise<Response> => {
        if (err) {
          return res.send(new errors.UnauthorizedError())
        }
        if (isMatch) {
          next()
          // Create JWT
          const token = jwt.sign(JSON.stringify(user), config.JWT_SECRET)
          res.set({ 'x-access-token': token })
          return res.send(200)
        } else {
          // Pass didnt match
          next()
          return res.send(new errors.UnauthorizedError())
        }
      })
    } catch (err) {
      // Email not found
      next()
      return res.send(new errors.UnauthorizedError())
    }
  }

  public async existe (req:Request, res:Response, next:Next):Promise<Response> {
    const user = await new UserDao().findByUsername(req.params.userName)
    next()
    return res.json(!!user)
  }
}

export default UserController
