import { makeUser, makeGoalType } from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($name: String!, $color: String, $public: Boolean) {
    createGoalWithGoalTypeBool(name: $name, color: $color, public: $public) {
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

describe('createGoalWithGoalTypeBool', () => {
  it('returns a goal', async () => {
    const response = await mutate({ mutation, variables });

    expect(response.data).toBeDefined();

    const { data: { createGoalWithGoalTypeBool } } = response;

    expect(createGoalWithGoalTypeBool).toBeTruthy();
    expect(createGoalWithGoalTypeBool.id).toBeType('string');
    expect(createGoalWithGoalTypeBool.name).toBe(variables.name);
    expect(createGoalWithGoalTypeBool.color).toBe(variables.color);
    expect(createGoalWithGoalTypeBool.public).toBe(variables.public);
    expect(createGoalWithGoalTypeBool.archived).toBe(false);
    expect(createGoalWithGoalTypeBool.createdAt).toBeType('string');
    expect(createGoalWithGoalTypeBool.updatedAt).toBeType('string');
    expect(createGoalWithGoalTypeBool.goalTypeImpl).toBeTruthy();
    expect(createGoalWithGoalTypeBool.goalTypeImpl.id).toBeType('string');
    expect(createGoalWithGoalTypeBool.goalTypeImpl.goalType).toBeTruthy();
    expect(createGoalWithGoalTypeBool.goalTypeImpl.goalType.id).toBeType('string');
    expect(createGoalWithGoalTypeBool.goalTypeImpl.goalType.type).toBe('GoalTypeBool');
  });

  it('returns an error when name is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, name: undefined } });

    expect(errors).toBeTruthy();
  });
});
