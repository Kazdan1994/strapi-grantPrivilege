const {describe, it, expect} = require('@jest/globals');

describe('grant-privilege test', () => {
  it('should return an object', async () => {
    const value = 'permissions.application.controllers.hello.find';

    const updateObj = value
      .split('.')
      .reduceRight((obj, next) => ({
        [next]: obj }), { enabled: true, policy: '' });

    expect(updateObj).toStrictEqual({
      permissions: { application: { controllers: { hello: { find: { enabled: true, policy: '' }}}}}
    })
  });

  it('should return an object 2', async () => {
    const value = 'permissions.application.controllers[\'google-agenda\'].find';

    const updateObj = value
      .split('.')
      .reduceRight((obj, next) => ({
        [next]: obj }), { enabled: true, policy: '' });

    expect(updateObj).toStrictEqual({
      permissions: { application: { controllers: { 'google-agenda': { find: { enabled: true, policy: '' }}}}}
    })
  });
});
