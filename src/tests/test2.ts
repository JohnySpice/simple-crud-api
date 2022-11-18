import { describe, it } from 'mocha';
import { IncorrectUserDataError, InvalidIdError, NotAllFieldsError, UserNotFoundError } from '../Errors';
import assert from 'assert';
import { req, user1 as user, incorrectUser } from './index';

describe('Requests with Error', function () {

  it('POST: send object without required fields', function (done) {
    req
      .post('/api/users')
      .send(incorrectUser)
      .expect('Content-Type', /application\/json/)
      .expect(400, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${NotAllFieldsError.message}: [age, hobbies]`);
      }, done);
  });

  it('POST: send non json', function (done) {
    req
      .post('/api/users')
      .send('text')
      .expect('Content-Type', /application\/json/)
      .expect(400, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${IncorrectUserDataError.message}`);
      }, done);
  });

  it('PUT: send invalid user id', function (done) {
    req
      .put('/api/users/id')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${InvalidIdError.message}`);
      }, done);
  });

  it('PUT: send non existing user id', function (done) {
    req
      .put('/api/users/1612fc27-2824-4233-9f83-235a4ed66527')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(404, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${UserNotFoundError.message}`);
      }, done);
  });

  it('DELETE: send invalid user id', function (done) {
    req
      .delete('/api/users/id')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${InvalidIdError.message}`);
      }, done);
  });

  it('DELETE: send non existing user id', function (done) {
    req
      .put('/api/users/1612fc27-2824-4233-9f83-235a4ed66527')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(404, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${UserNotFoundError.message}`);
      }, done);
  });
});