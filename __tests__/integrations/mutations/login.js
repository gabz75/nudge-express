import toBeType from 'jest-tobetype'; // @todo:  refator and move to setupTest file

import { createTestClient } from 'apollo-server-testing';

import server from '../../../server';
import db from '../../../models';

expect.extend(toBeType); // @todo:  refator and move to setupTest file

const { mutate } = createTestClient(server);

const mutation = `
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      createdAt
      updatedAt
      jwt
    }
  }
`;

const variables = { name: 'Gabe', email: 'gabriel@gmail.com', password: 'qweqweqwe' };

beforeAll(async () => {
  await db.sequelize.models.User.destroy({ where: {}, force: true });
  await db.sequelize.models.User.create(variables);
});

afterAll(async () => {
  await db.sequelize.models.User.destroy({ where: {}, force: true });
});

describe('login', () => {
  it('returns a user', async () => {
    const { email, password } = variables;

    const { data: { login } } = await mutate({ mutation, variables: { email, password } });

    expect(login).toBeDefined();
    expect(login.id).toBeType('string');
    expect(login.name).toBeDefined();
    expect(login.email).toBe(email);
    expect(login.jwt).toBeDefined();
    expect(login.createdAt).toBeType('string');
    expect(login.updatedAt).toBeType('string');
  });

  test.skip('returns an error when password is missing', async () => {
    const { email, password } = { ...variables, password: null };

    const res = await mutate({ mutation, variables: { email, password } });

    expect(res.errors).toBeDefined();
  });

  test('returns an error when email is missing', async () => {
    const { email, password } = { ...variables, email: null };


    const res = await mutate({ mutation, variables: { email, password } });

    expect(res.errors).toBeDefined();
  });
});
