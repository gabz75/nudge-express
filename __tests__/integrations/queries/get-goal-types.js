import { makeUser, makeGoalType } from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { query } = useTestClient();

const GET_GOAL_ENTRY_DEFS = `
  query {
    getGoalTypes {
      id
      type
      friendlyName
      description
      createdAt
      updatedAt
      createdAt
      updatedAt
    }
  }
`;

const goalTypes = [];

beforeAll(async () => {
  const user = await makeUser();
  goalTypes.push(await makeGoalType());
  goalTypes.push(await makeGoalType());

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('User');
  await dropModel('GoalType');
  await db.sequelize.close();
});

describe('getGoalTypes', () => {
  it('returns a list of GoalType', async () => {
    const response = await query({ query: GET_GOAL_ENTRY_DEFS });
    // console.log(response);
    const { data: { getGoalTypes } } = response;
    const [getGoalType] = getGoalTypes;
    const [goalType] = goalTypes;

    expect(getGoalTypes).toBeType('array');
    expect(getGoalTypes.length).toBe(2);
    expect(getGoalType.id).toBeDefined();
    expect(getGoalType.id).not.toBeNull();
    expect(getGoalType.id).toBe(`${goalType.id}`);
    expect(getGoalType.type).toBeType('string');
    expect(getGoalType.friendlyName).toBeType('string');
    expect(getGoalType.description).toBeType('string');
    expect(getGoalType.createdAt).toBeType('string');
    expect(getGoalType.updatedAt).toBeType('string');
    expect(getGoalType.createdAt).toBeType('string');
    expect(getGoalType.updatedAt).toBeType('string');
  });
});
