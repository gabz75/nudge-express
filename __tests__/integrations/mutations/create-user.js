import toBeType from 'jest-tobetype'; // @todo:  refator and move to setupTest file

import { createTestClient } from 'apollo-server-testing';

import db from '../../../models';
import { createContext } from '../../../server/apollo-server-context-testing';
import { createServer } from '../../../server/create-server';

expect.extend(toBeType); // @todo:  refator and move to setupTest file

const context = createContext(db);
const server = createServer(context);
const { mutate } = createTestClient(server);

const mutation = `
  mutation($email: String!, $name: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
      jwt
      createdAt
      updatedAt
    }
  }
`;

const variables = { name: 'Gabe', email: 'gabriel@gmail.com', password: 'qweqweqwe' };

describe('createUser', () => {
  it('returns a new user', async () => {
    const { data: { createUser } } = await mutate({ mutation, variables });

    expect(createUser).toBeTruthy();
    expect(createUser.id).toBeType('string');
    expect(createUser.name).toBe(variables.name);
    expect(createUser.email).toBe(variables.email);
    expect(createUser.jwt).toBeType('string');
    expect(createUser.createdAt).toBeType('string');
    expect(createUser.updatedAt).toBeType('string');
  });

  it('returns an error when name is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, name: undefined } });

    expect(errors).toBeTruthy();
  });

  it('returns an error when email is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, email: undefined } });

    expect(errors).toBeTruthy();
  });

  it('returns an error when password is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, password: undefined } });

    expect(errors).toBeTruthy();
  });
});
