const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op

exports.getUserBalance = (req, res) => {
  if (!req.query.userId) {
    res.status(400).send({
      message: 'Please provide user id!',
    })
  }

  const userId = req.query.userId
  var condition = { id: { [Op.eq]: userId } }

  User.findOne({
    where: condition,
    attributes: ['balance'],
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving balance.',
      })
    })
}

exports.updateUserBalance = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'Please provide user id!',
    })
  }

  const userId = req.params.id
  var condition = { id: { [Op.eq]: userId } }
  User.update({ balance: req.body.balance }, { where: condition })
    .then((data) => {
      res.status(200).send({ message: 'Balance successfuly updated!' })
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while updateing balance.',
      })
    })
}

exports.updateBalance = (userId, balanceToAdd) => {
  var condition = { id: { [Op.eq]: userId } }
  User.findOne({
    where: condition,
    attributes: ['balance'],
  }).then((data) => {
    const newBalance = balanceToAdd + data.balance
    User.update({ balance: newBalance }, { where: condition })
  })
}
