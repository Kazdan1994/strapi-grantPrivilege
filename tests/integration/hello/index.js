'use strict';

const { describe, it, expect } = require('@jest/globals');
const request = require('supertest');
const {createUser} = require("../../factories/user");
const {grantPrivilege, jwt} = require("../../helpers/strapi");

describe('hello tests', () => {
  it('should return hello', async () => {
    const user = await createUser();

    await grantPrivilege(
      'authenticated',
      'permissions.application.controllers.hello.find'
    );

    const response = await request(strapi.server)
      .get('/hello')
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + jwt(user.id));

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ message: 'hello world' });
  });
});
