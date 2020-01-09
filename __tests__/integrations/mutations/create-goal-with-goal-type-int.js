import { makeUser, makeGoalType } from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($name: String!, $color: String, $public: Boolean, $unit: String!) {
    createGoalWithGoalTypeInt(name: $name, color: $color, public: $public, unit: $unit) {
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
  unit: 'Miles',
};

beforeAll(async () => {
  const user = await makeUser();
  await makeGoalType({ type: 'goalTypeInt' });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('Goal');
  await dropModel('User');
  await dropModel('GoalTypeInt');
  await dropModel('GoalType');
  await db.sequelize.close();
});

describe('createGoalWithGoalTypeInt', () => {
  it('returns a goal', async () => {
    const response = await mutate({ mutation, variables });

    expect(response.data).toBeDefined();

    const { data: { createGoalWithGoalTypeInt } } = response;

    expect(createGoalWithGoalTypeInt).toBeTruthy();
    expect(createGoalWithGoalTypeInt.id).toBeType('string');
    expect(createGoalWithGoalTypeInt.name).toBe(variables.name);
    expect(createGoalWithGoalTypeInt.color).toBe(variables.color);
    expect(createGoalWithGoalTypeInt.public).toBe(variables.public);
    expect(createGoalWithGoalTypeInt.archived).toBe(false);
    expect(createGoalWithGoalTypeInt.createdAt).toBeType('string');
    expect(createGoalWithGoalTypeInt.updatedAt).toBeType('string');
    expect(createGoalWithGoalTypeInt.goalTypeImpl).toBeTruthy();
    expect(createGoalWithGoalTypeInt.goalTypeImpl.id).toBeType('string');
    expect(createGoalWithGoalTypeInt.goalTypeImpl.goalType).toBeTruthy();
    expect(createGoalWithGoalTypeInt.goalTypeImpl.goalType.id).toBeType('string');
    expect(createGoalWithGoalTypeInt.goalTypeImpl.goalType.type).toBe('GoalTypeInt');
    expect(createGoalWithGoalTypeInt.goalTypeImpl.unit).toBe('Miles');
  });

  it('returns an error when name is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, name: undefined } });

    expect(errors).toBeTruthy();
  });

  // it('returns an error when name is missing', async () => {
  //   const { errors } = await mutate({ mutation, variables: { ...variables, name: undefined } });

  //   expect(errors).toBeTruthy();
  // });
});
