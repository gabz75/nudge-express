export const createContext = (db) => (
  ({ req, res }) => (
    {

      db,
      req,
      res,
      jwtPayload: req && req.user, // jwt payload, express-jwt automatically decodes the Authorization header
    }
  )
);

export default createContext;
