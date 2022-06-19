import { describe, it } from 'mocha';
import { ResourceNotFoundError } from '../Errors';
import assert from 'assert';
import { req, user1 as user } from './index';

describe('Requests to non-existing endpoints', function () {

  it('GET', function (done) {
    req
      .get('/some/get/path')
      .expect('Content-Type', /application\/json/)
      .expect(404, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${ResourceNotFoundError.message}`);
      }, done);
  });

  it('POST', function (done) {
    req
      .post('/some/post/path')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(404, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${ResourceNotFoundError.message}`);
      }, done);
  });

  it('PUT', function (done) {
    req
      .put('/some/put/path')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(404, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${ResourceNotFoundError.message}`);
      }, done);
  });

  it('DELETE', function (done) {
    req
      .put('/some/delete/path')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(404, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result, `${ResourceNotFoundError.message}`);
      }, done);
  });
});