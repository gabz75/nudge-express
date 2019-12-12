import toBeType from 'jest-tobetype'; // @todo:  refator and move to setupTest file

import { createTestClient } from 'apollo-server-testing';

import db from '../../../models';
import { createContext, setAuthenticatedUser } from '../../../server/apollo-server-context-testing';
import { createServer } from '../../../server/create-server';

expect.extend(toBeType); // @todo:  refator and move to setupTest file

const context = createContext(db);
const server = createServer(context);
const { mutate } = createTestClient(server);

const mutation = `
  mutation($name: String!, $color: String, $public: Boolean) {
    createGoal(name: $name, color: $color, public: $public) {
      id
      name
      color
      public
      archived
      createdAt
      updatedAt
    }
  }
`;

const variables = { name: 'Medidate', color: '#dedede', public: true };

beforeAll(async () => {
  await db.sequelize.models.Goal.destroy({ where: {}, force: true });
  await db.sequelize.models.User.destroy({ where: {}, force: true });

  const user = await db.sequelize.models.User.create({
    name: 'Gabe',
    email: 'gabriel@gmail.com',
    password: 'qweqweqwe',
  });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await db.sequelize.models.Goal.destroy({ where: {}, force: true });
  await db.sequelize.models.User.destroy({ where: {}, force: true });
});

describe('createGoal', () => {
  it('returns a goal', async () => {
    const { data: { createGoal } } = await mutate({ mutation, variables });

    expect(createGoal).toBeDefined();
    expect(createGoal.id).toBeType('string');
    expect(createGoal.name).toBe(variables.name);
    expect(createGoal.color).toBe(variables.color);
    expect(createGoal.public).toBe(variables.public);
    expect(createGoal.archived).toBe(false);
    expect(createGoal.createdAt).toBeType('string');
    expect(createGoal.updatedAt).toBeType('string');
  });

  it('returns an error when name is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, name: undefined } });
    expect(errors).toBeDefined();
  });
});
