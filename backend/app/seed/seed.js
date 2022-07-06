const db = require('../models')
const Op = db.Sequelize.Op
const Event = db.events
const User = db.users
const Role = db.roles
const Sport = db.sports
const Odds = db.odds
var bcrypt = require('bcryptjs')

exports.run = () => {
  createOneSport({
    name: 'Football',
  }).then((sport) => {
    createOneEvent(
      sport.dataValues.id,
      {
        name: 'Barcelona - Liverpool',
      },
      {
        home: '2.20',
        tie: '7',
        guest: '2.40',
      }
    )
  })

  createOneSport({
    name: 'Tennis',
  }).then((sport) => {
    createOneEvent(
      sport.dataValues.id,
      {
        name: 'Federer - Nadal',
      },
      {
        home: '2.20',
        guest: '2.40',
      }
    )
  })

  Role.create({
    name: 'user',
  })

  Role.create({
    name: 'admin',
  })

  createOneUser('davor', 'davor@gmail.com', 'davor1234')
}

// Create and Save new Tutorials
createOneEvent = (sportId, event, odd) => {
  Odds.create(odd)
    .then((data) => {
      // Create event
      Event.create({
        name: event.name,
        sportId: sportId,
        oddId: data.id,
      })
        .then((event) => {
          console.log('>> Created event: ' + JSON.stringify(event, null, 4))
          return event
        })
        .catch((error) => {
          console.log('>> Error while creating odd: ', error)
        })
    })
    .catch((error) => {
      console.log('>> Error while creating event: ', error)
    })
}

// Create and Save new Sport
createOneSport = (sport) => {
  return Sport.create({
    name: sport.name,
  })
    .then((sport) => {
      console.log('>> Created sport: ' + JSON.stringify(sport, null, 4))
      return sport
    })
    .catch((err) => {
      console.log('>> Error while creating sport: ', err)
    })
}

// Create and Save new Tutorials
createOneUser = (username, email, password) => {
  User.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8),
    balance: 100,
  })
    .then((user) => {
      console.log('>> Created user: ' + JSON.stringify(user, null, 4))
      var condition = { name: { [Op.iLike]: `%user%` } }

      Role.findAll({
        where: condition,
      }).then((roles) => {
        user.setRoles(roles)
      })
    })
    .catch((err) => {
      console.log('>> Error while creating user: ', err)
    })
}
