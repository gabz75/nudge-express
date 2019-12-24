import { makeUser } from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

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
  const user = await makeUser();

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('Goal');
  await dropModel('User');
  await db.sequelize.close();
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
