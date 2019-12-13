import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class PrivateFieldDirective extends SchemaDirectiveVisitor {
  /**
   * This directive will protect agains sensitve data. If a field is flagged with the directive
   * `@privateField`, the value will only be accessible for the authenticatedUser.
   *
   * @param  {GraphQLField<any, any>} field
   */
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = (...args) => {
      const [model,, context] = args;
      const { authenticatedUser, ignorePrivateFieldDirective } = context;

      if (ignorePrivateFieldDirective) {
        return resolve.apply(this, args);
      }

      if (model.constructor.name === 'User' && model.id === authenticatedUser.id) {
        return resolve.apply(this, args);
      }

      return null;
    };
  }
}

export default PrivateFieldDirective;
