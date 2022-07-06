const { authJwt } = require('../middleware')
const users = require('../controllers/user.controller.js')

module.exports = (app) => {
  var router = require('express').Router()
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

  router.get('/balance', [authJwt.verifyToken], users.getUserBalance)
  router.put('/balance/:id', [authJwt.verifyToken], users.updateUserBalance)

  app.use('/api/v1/user', router)
}
