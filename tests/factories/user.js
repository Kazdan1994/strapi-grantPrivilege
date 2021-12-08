/**
 * Default data that factory use
 */
const defaultData = {
  password: 'password',
  provider: 'local',
  confirmed: true,
};

/**
 * Returns random username object for user creation
 * @param {object} options that overwrites default options
 * @returns {object} object that is used with `strapi.plugins["users-permissions"].services.user.add`
 */
const mockUserData = (options = {}) => {
  return {
    username: 'John Doe',
    email: 'john@doe.fr',
    lastname: 'Doe',
    firstname: 'John',
    ...defaultData,
    ...options,
  };
};

/**
 * Get role id from role type.
 * @param type
 * @return {Promise<*|number>}
 */
const getRole = async (type) => {
  const roles = await strapi.plugins['users-permissions'].services.userspermissions.getRoles();
  const role = roles.find((e) => e.type === type);

  return role ? role.id : 1;
};

/**
 * Creates new user in strapi database
 * @param {string} role
 * @param {object|null} data, that overwrites default options
 * @returns {object} object of new created user, fetched from database
 */
const createUser = async (role = 'authenticated', data = null) => {
  /** Gets the default user role */
  const defaultRole = await strapi.query('role', 'users-permissions').findOne({}, []);
  const roles = await strapi.plugins['users-permissions'].services.userspermissions.getRoles();
  const roleUser = roles.find((e) => e.type === role);

  /** Creates a new user an push to database */
  return strapi.plugins['users-permissions'].services.user.add({
    ...(data || mockUserData()),
    role: roleUser ? roleUser : defaultRole ? defaultRole.id : null,
  });
};

const deleteUsers = async () => {
  return strapi.plugins['users-permissions'].services.user.removeAll();
};

module.exports = {
  mockUserData,
  createUser,
  deleteUsers,
  defaultData,
  getRole,
};
