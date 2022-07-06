const db = require('../models')
const Event = db.events
const Odds = db.odds
const Bets = db.bets
const Op = db.Sequelize.Op
const sportController = require('./sport.controller')
const ticketControler = require('./ticket.controller')

// Create and Save a new Event
exports.createEvent = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.sportId || !req.body.odds) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // Validate sportId
  if (!sportController.existById(req.body.sportId)) {
    res.status(400).send({
      message: 'Sport id does not exists!',
    })
    return
  }

  // Create odds
  var odds = {
    home: req.body.odds.home,
    tie: req.body.odds.tie || null,
    guest: req.body.odds.guest,
  }

  Odds.create(odds)
    .then((data) => {
      // Create event
      const event = {
        name: req.body.name,
        sportId: req.body.sportId,
        oddId: data.id,
      }
      Event.create(event)
        .then((data) => {
          res.send(data)
        })
        .catch((error) => {
          res.status(500).send({
            message:
              error.message || 'Some error occurred while creating the event.',
          })
        })
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating the event.',
      })
    })
}

// Retrieve all Events from the database.
exports.findAllEvents = (req, res) => {
  const sportId = req.query.sportId
  const name = req.query.name
  var conditionSport = sportId ? { sportId: { [Op.eq]: sportId } } : null
  var conditionName = name ? { name: { [Op.iLike]: `%${name}%` } } : null
  var conditionNotFinished = { finished: { [Op.ne]: true } }

  Event.findAll({
    where: {
      [Op.and]: [conditionSport, conditionName, conditionNotFinished],
    },
    include: [Odds],
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Events.',
      })
    })
}

exports.resolveEvents = (req, res) => {
  var conditionNotFinished = { finished: { [Op.ne]: true } }

  Event.findAll({
    where: {
      [Op.and]: [conditionNotFinished],
    },
    include: [odds],
  })
    .then((data) => {
      data.map((event) => {
        const array = ['home', 'tie', 'guest']
        const randomElement = array[Math.floor(Math.random() * array.length)]
        var condition = { id: { [Op.eq]: event.dataValues.id } }

        Event.update(
          { status: randomElement, finished: true },
          { where: condition }
        )
        var conditionEvent = {
          eventId: { [Op.eq]: event.dataValues.id },
          passed: { [Op.ne]: null },
        }
        var conditionEqual = { expected: { [Op.eq]: randomElement } }

        Bets.update(
          { passed: true },
          {
            where: {
              [Op.and]: [conditionEvent, conditionEqual],
            },
          }
        )
        var conditionNotEqual = { expected: { [Op.ne]: randomElement } }

        Bets.update(
          { passed: false },
          {
            where: {
              [Op.and]: [conditionEvent, conditionNotEqual],
            },
          }
        )
        ticketControler.verifyTickets()
      })
      res.status(200).send({ message: 'Events successfuly updated!' })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while updateing Events.',
      })
    })
}
