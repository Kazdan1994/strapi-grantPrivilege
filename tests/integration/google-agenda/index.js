'use strict';

const { describe, it, expect } = require('@jest/globals');
const request = require('supertest');
const {createUser} = require("../../factories/user");
const {grantPrivilege, jwt} = require("../../helpers/strapi");

describe('google-agenda tests', () => {
  it('should return 200', async () => {
    const user = await createUser();

    await grantPrivilege(
      'authenticated',
      'permissions.application.controllers[\'google-agenda\'].find'
    );

    const response = await request(strapi.server)
      .get('/google-agendas')
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + jwt(user.id));

    expect(response.status).toBe(200);
  });
});
