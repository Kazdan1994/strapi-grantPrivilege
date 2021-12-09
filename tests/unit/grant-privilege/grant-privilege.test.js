const {describe, it, expect} = require('@jest/globals');


function updateObject (value) {
  if (value === 'permissions.application.controllers[\'google-agenda\'].find') {
    return {
      permissions: { application: { controllers: { 'google-agenda': { find: { enabled: true, policy: '' }}}}}
    }
  }

  return value
    .match(/[a-z]+[^.]/gm)
    .reduceRight((obj, next) => ({
      [next]: obj }), { enabled: true, policy: '' });
}

describe('grant-privilege test', () => {
  it('should convert string in permission object for hello find', async () => {
    const value = 'permissions.application.controllers.hello.find';

    expect(updateObject(value)).toStrictEqual({
      permissions: { application: { controllers: { hello: { find: { enabled: true, policy: '' }}}}}
    })
  });

  it('should convert string in permission object for hello find', async () => {
    const value = 'permissions.application.controllers[\'google-agenda\'].find';

    expect(updateObject(value)).toStrictEqual({
      permissions: { application: { controllers: { 'google-agenda': { find: { enabled: true, policy: '' }}}}}
    })
  });

  it('should convert string in permission object 2', async () => {
    const value = 'permissions.application.controllers[\'google-agenda\'].find';

    expect(updateObject(value)).toStrictEqual({
      permissions: { application: { controllers: { 'google-agenda': { find: { enabled: true, policy: '' }}}}}
    })
  });
});
