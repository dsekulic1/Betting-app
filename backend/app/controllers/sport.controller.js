const db = require('../models')
const Sport = db.sports
const Op = db.Sequelize.Op

// Create and Save a new Sport
exports.createSport = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // Create sport
  const sport = {
    name: req.body.name,
  }

  Sport.create(sport)
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating the sport.',
      })
    })
}

// Retrieve all Sports from the database.
exports.findAllSports = (req, res) => {
  const name = req.query.name
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null

  Sport.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving sports.',
      })
    })
}
// Find a single Sport with an id
exports.findOneSport = (req, res) => {
  const id = req.params.id

  Sport.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Sport with id=${id}.`,
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error retrieving Sport with id=' + id,
      })
    })
}
// Update a Sport by the id in the request
exports.updateSport = (req, res) => {
  const id = req.params.id

  Sport.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Sport was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Sport with id=${id}. Maybe Sport was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Sport with id=' + id,
      })
    })
}
// Delete a Sport with the specified id in the request
exports.deleteSport = (req, res) => {
  const id = req.params.id

  Sport.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Sport was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Sport with id=${id}. Maybe Sport was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Sport with id=' + id,
      })
    })
}
// Delete all Sports from the database.
exports.deleteAllSports = (req, res) => {
  Sport.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Sports were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all sports.',
      })
    })
}

exports.existById = (id) => {
  return Sport.count({ where: { id: id } }).then((count) => {
    if (count != 0) {
      return false
    }
    return true
  })
}
