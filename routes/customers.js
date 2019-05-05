const errros = require('restify-errors');
const rjwt = require('restify-jwt-community');

const Customer = require('../models/Customer');
const config = require('../config');

module.exports = server => {
  // Get Customers
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
      next();
    } catch (error) {
      return next(new errros.InvalidContentError(error));
    }
  });

  // Get Single Customer
  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.send(customer);
      next();
    } catch (error) {
      return next(
        new errros.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`
        )
      );
    }
  });

  // Add Customer
  server.post(
    '/customers',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errros.InvalidContentError("Expects 'application/json'")
        );
      }

      const { name, email, balance } = req.body;

      const customer = new Customer({
        name,
        email,
        balance
      });

      try {
        const newCustomer = await customer.save();
        res.send(201);
        next();
      } catch (error) {
        return next(new errros.InternalError(error.message));
      }
    }
  );

  //Update Customer
  server.put(
    '/customers/:id',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Check for JSON
      if (!req.is('application/json')) {
        return next(
          new errros.InvalidContentError("Expects 'application/json'")
        );
      }

      try {
        const customer = await Customer.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        res.send(200);
        next();
      } catch (error) {
        return next(
          new errros.ResourceNotFoundError(
            `There is no customer with the id of ${req.params.id}`
          )
        );
      }
    }
  );

  // Delete Customer
  server.del(
    '/customers/:id',
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        res.send(204);
        next();
      } catch (error) {
        return next(
          new errros.ResourceNotFoundError(
            `There is no customer with the id of ${req.params.id}`
          )
        );
      }
    }
  );
};
