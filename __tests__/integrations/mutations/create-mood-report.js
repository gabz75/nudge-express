import {
  makeUser,
  makeGoalType,
  makeGoalTypeInt,
  makeGoal,
} from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation(
    $score: Int!,
    $doing: String!,
    $feelings: String!,
    $date: DateTime!,
    $goalValues: [GoalValueInput]
  ) {
    createMoodReport(
      score: $score,
      doing: $doing,
      feelings: $feelings,
      date: $date,
      goalValues: $goalValues
    ) {
      id
      score
      doing
      feelings
      date
      createdAt
      updatedAt
      goalValues {
        id
        value {
          ... on GoalValueInt {
            intValue: value

          }
          ... on GoalValueBool {
            boolValue: value
          }
        }
      }
    }
  }
`;

let variables;

beforeAll(async () => {
  const user = await makeUser();
  const goalType1 = await makeGoalType({ type: 'GoalTypeInt' });
  const goalType2 = await makeGoalType({ type: 'GoalTypeBool' });
  const goalTypeInt = await makeGoalTypeInt({ GoalTypeId: goalType1.id, unit: 'Miles' });
  const goalTypeBool = await makeGoalTypeInt({ GoalTypeId: goalType2.id });
  const goal1 = await makeGoal({
    UserId: user.id,
    goalType: 'GoalTypeInt',
    goalTypeId: goalTypeInt.id,
  });
  const goal2 = await makeGoal({
    UserId: user.id,
    goalType: 'GoalTypeBool',
    goalTypeId: goalTypeBool.id,
  });

  variables = {
    score: 10,
    doing: 'I did this and that',
    feelings: 'I feel this and that',
    date: '2020-02-07T05:14:04.650Z',
    goalValues: [
      { goalId: goal1.id, intValue: 10 },
      { goalId: goal2.id, booleanValue: true },
    ],
  };

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('GoalTypeInt');
  await dropModel('GoalTypeBool');
  await dropModel('GoalType');
  await dropModel('GoalValueInt');
  await dropModel('GoalValueBool');
  await dropModel('GoalValue');
  await dropModel('MoodReport');
  await dropModel('Goal');
  await dropModel('User');
  await db.sequelize.close();
});

describe('createGoal', () => {
  it('returns a MoodReport', async () => {
    const response = await mutate({ mutation, variables });

    expect(response.data).toBeDefined();

    const { data: { createMoodReport } } = response;

    expect(createMoodReport).toBeTruthy();
    expect(createMoodReport.id).toBeType('string');
    expect(createMoodReport.score).toBe(variables.score);
    expect(createMoodReport.doing).toBe(variables.doing);
    expect(createMoodReport.date).toBeType('string');
    expect(createMoodReport.createdAt).toBeType('string');
    expect(createMoodReport.updatedAt).toBeType('string');
    expect(createMoodReport.goalValues).not.toHaveLength(0);
    expect(createMoodReport.goalValues[0].id).toBeType('string');
    expect(createMoodReport.goalValues[0].value.intValue).toBe(10);
    expect(createMoodReport.goalValues[1].id).toBeType('string');
    expect(createMoodReport.goalValues[1].value.boolValue).toBe(true);
  });
});
