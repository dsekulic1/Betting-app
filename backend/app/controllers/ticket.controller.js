const db = require('../models')
const Bet = db.bets
const Event = db.events
const Ticket = db.tickets
const Sport = db.sports
const Op = db.Sequelize.Op
const userControler = require('./user.controller')

// Create and Save a new Ticket
exports.createTicket = (req, res) => {
  // Validate request
  if (!req.body.bets) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  const ticket = {
    bet: req.body.bet,
    excpectedGain: req.body.excpectedGain,
    userId: req.body.userId,
  }

  Ticket.create(ticket)
    .then((data) => {
      // Create bets
      req.body.bets.map((bet) => {
        Bet.create({
          expected: bet.expected,
          quota: bet.quota,
          ticketId: data.id,
          eventId: bet.id,
        }).catch((error) => {
          res.status(500).send({
            message:
              error.message || 'Some error occurred while creating the ticket.',
          })
        })
      })
      res.status(200).send({ message: 'Ticket successfuly created!' })
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating the event.',
      })
    })
}

exports.getAllUserTicket = (req, res) => {
  // Validate request
  if (!req.query.userId) {
    res.status(400).send({
      message: 'Please provide user id!',
    })
    return
  }

  var condition = { userId: { [Op.eq]: req.query.userId } }

  Ticket.findAll({
    where: condition,
    include: [
      {
        model: Bet,
        include: [{ model: Event, required: true, include: [Sport] }],
        required: true,
      },
    ],
  })
    .then((tickets) => {
      res.send(tickets)
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while getting the ticket.',
      })
    })
}

exports.verifyTickets = () => {
  var condition = { status: { [Op.eq]: 'UNRESOLVED' } }

  Ticket.findAll({
    where: condition,
    include: [
      {
        model: Bet,
        required: true,
      },
    ],
  }).then((tickets) => {
    // verify and update
    tickets.map((ticket) => {
      const containsNoPassedValue = ticket.dataValues.bets.some(
        (bet) => bet.dataValues.passed === false
      )
      var tiketCondition = { id: { [Op.eq]: ticket.dataValues.id } }
      if (containsNoPassedValue) {
        Ticket.update({ status: 'LOST' }, { where: tiketCondition })
      } else {
        Ticket.update({ status: 'WIN' }, { where: tiketCondition })
        userControler.updateBalance(
          ticket.dataValues.userId,
          ticket.dataValues.excpectedGain
        )
      }
    })
  })
}
