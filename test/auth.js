process.env.NODE_ENV = 'test';

const Users = require('../mongoose/models/Users');
const chai = require('chai');
const should = chai.should();
const request = require('supertest');
const server = require('../app');
const Promise = require('bluebird');
const tools = require('./tools');

describe('Auth', () => {
  before((done) => {
    Users.remove(done);
  });

  const agent = request.agent(server);
  const newUserData = {
    email: 'test1@gmail.com',
    password: '123456',
    name: 'Max',
  };

  describe('Register', () => {
    it('Register user without password POST /api/register', (done) => {
      agent
        .post('/api/register')
        .send({ email: newUserData.email, name: newUserData.name })
        .end((err, res) => {
          res.body.error.should.be.eql(true);
          Users.count({}, (error, count) => {
            count.should.be.eql(0);
            done();
          });
        });
    });

    it('Register user POST /api/register', (done) => {
      agent
        .post('/api/register')
        .send(newUserData)
        .end((err, res) => {
          const user = res.body;
          user.should.be.a('object');
          user.name.should.be.eql(newUserData.name);
          user.email.should.be.eql(newUserData.email);

          Users.count({}, (error, count) => {
            count.should.be.eql(1);
            done();
          });
        });
    });
  });

  describe('Auth', () => {
    let checkUserAuth = (cb) => {
      agent
        .get('/api/get_user')
        .end(cb);
    };

    checkUserAuth = Promise.promisify(checkUserAuth);

    it('Check user auth after registration GET /api/get_user', (done) => {
      checkUserAuth()
        .then((res) => {
          res.body.email.should.be.eql(newUserData.email);
          done();
        });
    });

    it('Unauthorizate user GET /api/log_out', (done) => {
      agent
        .get('/api/log_out')
        .end((err, res) => {
          checkUserAuth()
            .then((responce) => {
              should.not.exist(res.body.email);
              done();
            });
        });
    });

    it('Auth user POST /api/auth', (done) => {
      tools
        .authAsync(agent, newUserData.email, newUserData.password)
        .then((responce) => {
          responce.body.email.should.be.eql(newUserData.email);
          return checkUserAuth();
        })
        .then(() => done())
        .catch((err) => console.log(err));
    });
  });
});
