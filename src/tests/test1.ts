import { describe, it } from 'mocha';
import assert from 'assert';
import { req } from './index';
import { user1, user2, userForUpdate, userAfterUpdate } from './index';

describe('Simple requests', function () {
  it('GET: empty db', function (done) {
    req.
      get('/api/users')
      .expect('Content-Type', /application\/json/)
      .expect(200, { result: [] }, done);
  });

  it('POST: correct object', function (done) {
    req
      .post('/api/users')
      .send(user1)
      .expect('Content-Type', /application\/json/)
      .expect(201, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result.username, 'john');
        assert.strictEqual(result.age, 20);
        assert.deepStrictEqual(result.hobbies, ['hobbie1', 'hobbie2']);
      }, done);
  });

  it('POST: another correct object', function (done) {
    req
      .post('/api/users')
      .send(user2)
      .expect('Content-Type', /application\/json/)
      .expect(201, done)
      .expect((res) => {
        const result = res.body.result;
        assert.strictEqual(result.username, 'pete');
        assert.strictEqual(result.age, 32);
        assert.deepStrictEqual(result.hobbies, ['hobbie3', 'hobbie4']);
      }, done);
  });

  it('GET: all users', function (done) {
    req
      .get('/api/users')
      .expect('Content-Type', /application\/json/)
      .expect(200, done)
      .expect((res) => {
        const result = res.body.result;
        user1.id = result[0].id;
        user2.id = result[1].id;
        assert.deepStrictEqual(result, [user1, user2]);
      }, done);
  });

  it('PUT: update user', function (done) {
    req
      .put(`/api/users/${user1.id}`)
      .send(userForUpdate)
      .expect('Content-Type', /application\/json/)
      .expect(200, done)
      .expect((res) => {
        const result = res.body.result;
        userAfterUpdate.id = result.id;
        assert.deepStrictEqual(result, userAfterUpdate);
      }, done);
  });

  it('DELETE: remove user', function (done) {
    req
      .delete(`/api/users/${user2.id}`)
      .send(userForUpdate)
      .expect('Content-Type', /application\/json/)
      .expect(204, done);
  });

  it('GET: check removed user', function (done) {
    req
      .get(`/api/users/`)
      .expect('Content-Type', /application\/json/)
      .expect(200, done)
      .expect((res) => {
        const result = res.body.result;
        userAfterUpdate.id = result[0].id;
        assert.deepStrictEqual(result, [userAfterUpdate]);
      }, done);
  });

});