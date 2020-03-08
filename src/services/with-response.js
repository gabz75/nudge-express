import { UserInputError } from 'apollo-server-express';

async function handleResolverUsingResponse(callback, ...args) {
  const response = await callback(...args);

  if (response.success) {
    return response.data;
  }

  throw new UserInputError(response.errors);
}

export default function withResponse(callback, ...args) {
  return handleResolverUsingResponse.bind(null, callback, ...args);
}
