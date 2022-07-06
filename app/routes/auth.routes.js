const { verifySignUp } = require('../middleware')
const authController = require('../controllers/auth.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })
  var router = require('express').Router()

  router.post(
    '/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    authController.signup
  )

  router.post('/signin', authController.signin)

  app.use('/api/v1/auth', router)
}
