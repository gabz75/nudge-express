import * as yup from 'yup';

import Response from '~/services/response';
import withValidations from '~/services/with-validations';

export const INVALID_EMAIL_PASSWORD_ERROR = 'Invalid email or password';

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

async function login(parent, args, context /* , info */) {
  const { db } = context;
  const { User } = db;
  const user = await User.findOne({ where: { email: args.email } });

  if (!user) {
    return Response.withError(INVALID_EMAIL_PASSWORD_ERROR);
  }

  if (!user.verifyPassword(args.password)) {
    return Response.withError(INVALID_EMAIL_PASSWORD_ERROR);
  }

  // this is an authentication mutation, therefore it's safe to return private fields
  context.ignorePrivateFieldDirective = true;

  return Response.withData(user);
}

export default withValidations(login, validationSchema);
