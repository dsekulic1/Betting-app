const { authJwt } = require('../middleware')
const sports = require('../controllers/sport.controller.js')

module.exports = (app) => {
  var router = require('express').Router()
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

  router.post('/', [authJwt.verifyToken], sports.createSport)
  router.get('/', sports.findAllSports)

  // These routes are just to demonstrate how it work
  router.get('/:id', sports.findOneSport)
  router.put(
    '/:id',
    [(authJwt.verifyToken, authJwt.isAdmin)],
    sports.updateSport
  )
  router.delete(
    '/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    sports.deleteSport
  )
  router.delete(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin],
    sports.deleteAllSports
  )

  app.use('/api/v1/sports', router)
}
