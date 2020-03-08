import * as yup from 'yup';

import Response from '~/services/response';
import withValidations from '~/services/with-validations';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('email is required'),
  password: yup
    .string()
    .min(8)
    .max(32)
    .required(),
});

function createUser(parent, args, context /* , info */) {
  const { db } = context;
  const { User } = db;

  // this is an account creation mutation, therefore it's safe to return private fields
  context.ignorePrivateFieldDirective = true;

  return Response.withPromise(User.create(args));
}

export default withValidations(createUser, validationSchema);
