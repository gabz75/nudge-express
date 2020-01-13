import { makeUser, makeGoalType } from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($name: String!, $color: String, $public: Boolean, $goalType: String!) {
    createGoal(name: $name, color: $color, public: $public, goalType: $goalType) {
      id
      name
      color
      public
      archived
      createdAt
      updatedAt
      goalTypeImpl {
        id
        goalType {
          id
          type
        }
      }
    }
  }
`;

const variables = {
  name: 'Medidate',
  color: '#dedede',
  public: true,
  goalType: 'GoalTypeBool',
};

beforeAll(async () => {
  const user = await makeUser();
  await makeGoalType();

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('Goal');
  await dropModel('User');
  await dropModel('GoalTypeBool');
  await dropModel('GoalType');
  await db.sequelize.close();
});

describe('createGoal', () => {
  it('returns a goal', async () => {
    const response = await mutate({ mutation, variables });

    expect(response.data).toBeDefined();

    const { data: { createGoal } } = response;

    expect(createGoal).toBeTruthy();
    expect(createGoal.id).toBeType('string');
    expect(createGoal.name).toBe(variables.name);
    expect(createGoal.color).toBe(variables.color);
    expect(createGoal.public).toBe(variables.public);
    expect(createGoal.archived).toBe(false);
    expect(createGoal.createdAt).toBeType('string');
    expect(createGoal.updatedAt).toBeType('string');
    expect(createGoal.goalTypeImpl).toBeTruthy();
    expect(createGoal.goalTypeImpl.id).toBeType('string');
    expect(createGoal.goalTypeImpl.goalType).toBeTruthy();
    expect(createGoal.goalTypeImpl.goalType.id).toBeType('string');
    expect(createGoal.goalTypeImpl.goalType.type).toBe('GoalTypeBool');
  });

  it('returns an error when name is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, name: undefined } });

    expect(errors).toBeTruthy();
  });

  it('returns an error when goalType is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, goalType: undefined } });

    expect(errors).toBeTruthy();
  });
});
