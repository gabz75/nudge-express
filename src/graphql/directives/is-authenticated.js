import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { UnauthorizedError } from 'express-jwt';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  /**
   * Extract the User ID from the JWT payload and attempt to find the User in database.
   * Throws an error when the JWT is missing or if it does not contain the correct User ID in its payload.
   *
   * @param  {GraphQLField<any, any>} field
   * @throws UnauthorizedError
   */
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (...args) => {
      const [,, context] = args;
      const { jwtPayload } = context;
      const { User } = context.db.sequelize.models;

      if (!jwtPayload) {
        throw new UnauthorizedError('missing_jwt', { message: 'Missing JWT in Authorization header' });
      }

      if (!jwtPayload.id) {
        throw new UnauthorizedError('invalid_jwt', { message: 'Invalid JWT' });
      }

      const authenticatedUser = await User.findByPk(jwtPayload.id);

      if (!authenticatedUser) {
        throw new UnauthorizedError('invalid_jwt', { message: 'Invalid JWT' });
      }

      // attach authenticatedUser to the context
      context.authenticatedUser = authenticatedUser;

      return resolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
