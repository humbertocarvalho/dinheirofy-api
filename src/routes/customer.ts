import { Server } from 'restify'
import CustomerController from '../controllers/customer-controller'
import config from '../../config'
import rjwt from 'restify-jwt-community'

class CustomerRoute {
  private restify: Server

  public constructor (server:Server) {
    this.restify = server
    const customerController = new CustomerController()
    this.restify.get('/customers', customerController.listar)
    this.restify.get('/customers/:id', customerController.selecionar)
    this.restify.post('/customers', rjwt({ secret: config.JWT_SECRET }), customerController.inserir)
    this.restify.put('/customers/:id', rjwt({ secret: config.JWT_SECRET }), customerController.atualizar)
    this.restify.del('/customers/:id', rjwt({ secret: config.JWT_SECRET }), customerController.deletar)
  }
}

export default CustomerRoute
