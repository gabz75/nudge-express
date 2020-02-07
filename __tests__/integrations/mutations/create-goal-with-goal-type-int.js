import { makeUser, makeGoalType } from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($name: String!, $color: String, $public: Boolean, $goalType: String!, $unit: String) {
    createGoal(name: $name, color: $color, public: $public, goalType: $goalType, unit: $unit) {
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
        ... on GoalTypeInt {
          unit
        }
      }
    }
  }
`;

const variables = {
  name: 'Running',
  color: '#dedede',
  public: true,
  goalType: 'GoalTypeInt',
  unit: 'Miles',
};

beforeAll(async () => {
  const user = await makeUser();
  await makeGoalType({ type: 'GoalTypeInt' });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('Goal');
  await dropModel('User');
  await dropModel('GoalTypeInt');
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
    expect(createGoal.goalTypeImpl.goalType.type).toBe('GoalTypeInt');
    expect(createGoal.goalTypeImpl.unit).toBe('Miles');
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
