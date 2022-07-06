let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('simple GET', () => {
  it('it should GET status 200 and expected message', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have
          .property('message')
          .eql('Welcome to our betting app!')
        done()
      })
  })
})

describe('Testing sport', () => {
  it('it should Login before adding sport', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'davor@gmail.com',
        password: 'davor1234',
      })
      .end((err, res) => {
        var token = res.body.accessToken
        let sport = { name: 'skiing' }

        chai
          .request(server)
          .post('/api/v1/sports')
          .set('x-access-token', token)
          .send(sport)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            done()
          })
      })
  })

  it('it should GET all sports', (done) => {
    chai
      .request(server)
      .get('/api/v1/sports')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.greaterThan(0)
        done()
      })
  })

  it('it should be unautorized', (done) => {
    let sport = { name: 'skiing' }

    chai
      .request(server)
      .post('/api/v1/sports')
      .set('x-access-token', '')
      .send(sport)
      .end((err, res) => {
        res.should.have.status(403)
        res.body.should.be.a('object')
        res.body.should.have.property('message').eql('No token provided!')
        done()
      })
  })
})
