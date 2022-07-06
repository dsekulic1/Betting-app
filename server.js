require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const seed = require('./app/seed/seed')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require('./app/models')

db.sequelize.sync()

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.')
//   seed.run()
// })

// routes
require('./app/routes/sport.routes')(app)
require('./app/routes/event.routes')(app)
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)
require('./app/routes/ticket.routes')(app)

app.get('/', (req, res) => res.json({ message: 'Welcome to our betting app!' }))

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

module.exports = app
