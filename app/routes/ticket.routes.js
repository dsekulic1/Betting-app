const { authJwt } = require('../middleware')
const tickets = require('../controllers/ticket.controller.js')

module.exports = (app) => {
  var router = require('express').Router()
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

  router.post('/', [authJwt.verifyToken], tickets.createTicket)
  router.get('/', [authJwt.verifyToken], tickets.getAllUserTicket)

  app.use('/api/v1/ticket', router)
}
