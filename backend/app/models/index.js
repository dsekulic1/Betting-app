const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.sports = require('./sport.model.js')(sequelize, Sequelize)
db.events = require('./event.model.js')(sequelize, Sequelize)
db.users = require('./user.model.js')(sequelize, Sequelize)
db.roles = require('./role.model.js')(sequelize, Sequelize)
db.odds = require('./odd.model.js')(sequelize, Sequelize)
db.bets = require('./bet.model.js')(sequelize, Sequelize)
db.tickets = require('./ticket.model.js')(sequelize, Sequelize)

db.sports.hasOne(db.events)
db.events.belongsTo(db.sports, { foreignKey: 'sportId' })

db.roles.belongsToMany(db.users, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})
db.users.belongsToMany(db.roles, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})

db.ROLES = ['user', 'admin']

db.odds.hasOne(db.events)
db.events.belongsTo(db.odds)

db.events.hasMany(db.bets)
db.bets.belongsTo(db.events, { foreignKey: 'eventId' })

db.tickets.hasMany(db.bets)
db.bets.belongsTo(db.tickets, { foreignKey: 'ticketId' })

db.users.hasMany(db.tickets)
db.tickets.belongsTo(db.users)

module.exports = db
