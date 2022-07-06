const { authJwt } = require('../middleware')
const events = require('../controllers/event.controller.js')

module.exports = (app) => {
  var router = require('express').Router()

  router.post('/', [authJwt.verifyToken], events.createEvent)
  router.get('/', events.findAllEvents)
  router.put('/resolve', [authJwt.verifyToken], events.resolveEvents)

  app.use('/api/v1/events', router)
}
