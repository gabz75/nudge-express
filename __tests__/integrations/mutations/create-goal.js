import faker from 'faker';

import { setAuthenticatedUser } from '../../utils/apollo-server-context';
import { useTestClient, db, dropModel } from '../../utils/use-test-client';

const { mutate } = useTestClient();

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
  const user = await db.sequelize.models.User.create({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'qweqweqwe',
  });

  setAuthenticatedUser(user);
});

beforeEach(async () => {
  await dropModel('Goal');
});

afterEach(async () => {
  await dropModel('Goal');
});

afterAll(async () => {
  await dropModel('User');
});

describe('createGoal', () => {
  it('returns a goal', async () => {
    const { data: { createGoal } } = await mutate({ mutation, variables });

    expect(createGoal).toBeTruthy();
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

    expect(errors).toBeTruthy();
  });
});
