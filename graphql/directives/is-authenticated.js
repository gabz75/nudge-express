import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from "graphql";


class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
     const { resolve = defaultFieldResolver } = field;

     field.resolve = async function(...args) {
       let context;
       [,,context] = args;

       const jwtPayload = context.jwtPayload;
       const User = context.db.sequelize.models.User;

       if (!jwtPayload) {
         throw new Error('No JWT Payload');
       }

       if (!jwtPayload.id) {
         throw new Error('Missing `id` in JWT Payload');
       }

       const authenticatedUser = await User.findByPk(jwtPayload.id);

       if (!authenticatedUser) {
         throw new Error('No user found');
       }

       // attach authenticatedUser to the context
       context.authenticatedUser = authenticatedUser;

       return resolve.apply(this, args);
     };
  }
}

export default IsAuthenticatedDirective;
