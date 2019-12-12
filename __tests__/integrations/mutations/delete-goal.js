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
  mutation($id: ID!) {
    deleteGoal(id: $id) {
      id
      name
    }
  }
`;

let goal;

beforeAll(async (done) => {
  const user = await db.sequelize.models.User.create({
    name: 'Gabe',
    email: 'gabriel@gmail.com',
    password: 'qweqweqwe',
  });

  goal = await db.sequelize.models.Goal.create({
    name: 'Medidate',
    color: '#d9d9d9',
    public: true,
    UserId: user.id,
  });

  setAuthenticatedUser(user);

  done();
});

describe('deleteGoal', () => {
  it('returns a goal', async () => {
    const { data: { deleteGoal } } = await mutate({ mutation, variables: { id: goal.id } });

    expect(deleteGoal).toBeTruthy();
    expect(deleteGoal.id).toBeType('string');
    expect(deleteGoal.name).toBe(goal.name);
  });

  it('returns an error when id is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { id: undefined } });

    expect(errors).toBeType('array');
  });
});
