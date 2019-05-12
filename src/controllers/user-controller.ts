import errors from 'restify-errors'
import { bcrypt, Error } from 'bcryptjs'
// import config from '../../config'
// import rjwt from 'restify-jwt-community'
import { Request, Response, Next } from 'restify'

class UserController {
  public async registrar (req: Request, res:Response, next:Next) : Promise<Response> {
    const { userName, name, email, password } = req.body

    bcrypt.genSalt(10)

    // bcrypt.genSalt(10, (err:Error, salt:string):Promise<Response> => {
    //   bcrypt.hash(password, salt, async (err:Error, hash:string) => {
    //     // Hash PasswordCustomer
    //     try {
    //       new UserDao().create({
    //         userName,
    //         name,
    //         email,
    //         password: hash
    //       })
    //       res.send(201)
    //       res.set('x-access-token', token)
    //       next()
    //     } catch (err:Error) {
    //       next()
    //       return res.send(new errors.InternalError(err.message))
    //     }
    //   })
    // })

    next()
    return res.send()
  }
}

export default UserController
