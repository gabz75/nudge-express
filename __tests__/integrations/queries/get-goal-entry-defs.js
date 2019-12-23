import makeUser from 'tests/factories/user';
import makeGoalEntryDef from 'tests/factories/goal-entry-def';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { query } = useTestClient();

const GET_GOAL_ENTRY_DEFS = `
  query {
    getGoalEntryDefs {
      id
      goalEntryDefMapping
      friendlyName
      description
      createdAt
      updatedAt
      createdAt
      updatedAt
    }
  }
`;

const goalEntryDefs = [];

beforeAll(async () => {
  const user = await makeUser();
  goalEntryDefs.push(await makeGoalEntryDef());
  goalEntryDefs.push(await makeGoalEntryDef());

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('User');
  await dropModel('GoalEntryDef');
  await db.sequelize.close();
});

describe('getGoalEntryDefs', () => {
  it('returns a list of GoalEntryDef', async () => {
    const response = await query({ query: GET_GOAL_ENTRY_DEFS });
    // console.log(response);
    const { data: { getGoalEntryDefs } } = response;
    const [getGoalEntryDef] = getGoalEntryDefs;
    const [goalEntryDef] = goalEntryDefs;

    expect(getGoalEntryDefs).toBeType('array');
    expect(getGoalEntryDefs.length).toBe(2);
    expect(getGoalEntryDef.id).toBeDefined();
    expect(getGoalEntryDef.id).not.toBeNull();
    expect(getGoalEntryDef.id).toBe(`${goalEntryDef.id}`);
    expect(getGoalEntryDef.goalEntryDefMapping).toBeType('string');
    expect(getGoalEntryDef.friendlyName).toBeType('string');
    expect(getGoalEntryDef.description).toBeType('string');
    expect(getGoalEntryDef.createdAt).toBeType('string');
    expect(getGoalEntryDef.updatedAt).toBeType('string');
    expect(getGoalEntryDef.createdAt).toBeType('string');
    expect(getGoalEntryDef.updatedAt).toBeType('string');
  });
});
