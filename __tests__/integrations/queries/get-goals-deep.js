import makeGoalWithEntry from 'tests/factory-scenarios/goal-with-entry';
import makeUser from 'tests/factories/user';

import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { query } = useTestClient();

const GET_GOALS = `
  query {
    getGoals {
      id
      goalTypeImpl {
        id
        ... on GoalTypeInt {
          unit
        }
      }
      goalEntries {
        entry {
          id
          ... on GoalEntryInt {
            intValue: value
          }
          ... on GoalEntryBool {
            boolValue: value
          }
        }
      }
    }
  }
`;

beforeAll(async () => {
  const user = await makeUser();

  await makeGoalWithEntry({ user });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('GoalEntryBool');
  await dropModel('GoalTypeBool');
  await dropModel('GoalEntry');
  await dropModel('GoalType');
  await dropModel('Goal');
  await dropModel('MoodReport');
  await dropModel('User');
  await db.sequelize.close();
});

describe('getGoals', () => {
  it('returns a list of goals with deep nested object', async () => {
    const response = await query({ query: GET_GOALS });
    const { data: { getGoals } } = response;
    const [goal] = getGoals;

    expect(getGoals).toBeType('array');
    expect(getGoals.length).toBe(1);
    expect(goal.goalTypeImpl).toBeDefined();
    expect(goal.goalEntries).toBeType('array');

    const [goalEntry] = goal.goalEntries;
    expect(goalEntry).toBeDefined();
    expect(goalEntry.entry).toBeDefined();
    expect(goalEntry.entry.boolValue).toBeType('boolean');
  });
});
