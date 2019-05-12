import errors from 'restify-errors'
import { Customer } from '../schemas/Customer'
// import config from '../../config'
// import rjwt from 'restify-jwt-community'
import { Request, Response, Next } from 'restify'

class CustomerController {
  public async listar (req: Request, res:Response, next:Next) : Promise<Response> {
    try {
      const customers = await Customer.find({})
      next()
      return res.send(customers)
    } catch (error) {
      next()
      return res.send(new errors.InvalidContentError(error))
    }
  }

  public async selecionar (req: Request, res:Response, next:Next) : Promise<Response> {
    try {
      const customer = await Customer.findById(req.params.id)
      next()
      return res.send(customer)
    } catch (error) {
      next()
      return res.send(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        ))
    }
  }

  public async inserir (req: Request, res:Response, next:Next) : Promise<Response> {
    // Check for JSON
    if (!req.is('application/json')) {
      next()
      return res.send(new errors.InvalidContentError("Expects 'application/json'"))
    }

    const { name, email, balance } = req.body

    const customer = new Customer({
      name,
      email,
      balance
    })

    try {
      const newCustomer = await customer.save()
      if (newCustomer) {
        next()
        return res.send(201)
      }
    } catch (error) {
      next()
      return res.send(new errors.InternalError(error.message))
    }
  }

  public async atualizar (req: Request, res:Response, next: Next): Promise<Response> {
    // Check for JSON
    if (!req.is('application/json')) {
      next()
      return res.send(new errors.InvalidContentError("Expects 'application/json'"))
    }

    try {
      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body
      )
      if (customer) {
        next()
        return res.send(200)
      }
    } catch (error) {
      next()
      return res.send(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      )
    }
  }

  public async deletar (req: Request, res:Response, next: Next): Promise<Response> {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id)
      if (customer) {
        next()
        return res.send(204)
      }
    } catch (error) {
      next()
      return res.send(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      )
    }
  }
}

export default CustomerController
