import Response from '~/services/response';

async function validateAndResolve(callback, validationSchema, parent, args, context, info) {
  try {
    await validationSchema.validate(args);

    return await callback(parent, args, context, info);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return Response.withValidationError(error);
    }

    return error;
  }
}

export default function withValidations(callback, validationSchema) {
  return validateAndResolve.bind(null, callback, validationSchema);
}
