/**
 * Simulate request object that doesn't exist in test
 * @type {Object}
 */
const req = {};

/**
 * Simulate response object that doesn't exist in test
 * @type {Object}
 */
const res = {};

/**
 * In tests, req, res don't exists, provide a separate function to specify an authenticatedUser
 * @see setAuthenticatedUser.
 *
 * @param  {Object} db)
 * @return {Object}
 */
export const createContext = (db) => (
  () => (
    {

      db,
      req,
      res,
      jwtPayload: req && req.user, // jwt payload, express-jwt automatically decodes the Authorization header
    }
  )
);

/**
 * Set and mock the user on the request object for testing environment
 *
 * @param  {User} user
 * @return {Object}
 */
export const setAuthenticatedUser = (user) => {
  req.user = user;
};

export default createContext;
