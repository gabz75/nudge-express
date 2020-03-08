import scenarioGoalWithValues from 'tests/factory-scenarios/goal-with-entry';
import { makeUser } from 'tests/factories';

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
      goalValues {
        id
        intValue
        boolValue
      }
    }
  }
`;

beforeAll(async () => {
  const user = await makeUser();

  await scenarioGoalWithValues({ user });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('GoalTypeBool');
  await dropModel('GoalValue');
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
    expect(goal.goalValues).toBeType('array');

    const [goalValue] = goal.goalValues;
    expect(goalValue).toBeDefined();
    expect(goalValue.id).toBeType('string');
    expect(goalValue.boolValue).toBeType('boolean');
  });
});
