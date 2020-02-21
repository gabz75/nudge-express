import {
  makeGoal,
  makeGoalType,
  makeGoalTypeInt,
  makeGoalValue,
  makeMoodReport,
  makeUser,
} from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation(
    $id: ID!,
    $score: Int!,
    $doing: String!,
    $feelings: String!,
    $date: DateTime!,
    $goalValues: [GoalValueInput]
  ) {
    updateMoodReport(
      id: $id,
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
        intValue
        boolValue
        floatValue
        stringValue
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
  const moodReport = await makeMoodReport({
    UserId: user.id,
    date: new Date(),
    score: 10,
    doing: 'I was doing this and that',
    feelings: 'I was feeling this and that',
  });
  await makeGoalValue({
    MoodReportId: moodReport.id,
    GoalId: goal1.id,
    intValue: 10,
  });
  await makeGoalValue({
    MoodReportId: moodReport.id,
    GoalId: goal2.id,
    boolValue: true,
  });

  variables = {
    id: moodReport.id,
    score: 9,
    doing: 'I actually did this and that',
    feelings: 'I actually feel this and that',
    date: '2020-02-07T05:14:04.650Z',
    goalValues: [
      { goalId: goal1.id, intValue: 5 },
      { goalId: goal2.id, boolValue: false },
    ],
  };

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('GoalTypeInt');
  await dropModel('GoalTypeBool');
  await dropModel('GoalType');
  await dropModel('GoalValue');
  await dropModel('MoodReport');
  await dropModel('Goal');
  await dropModel('User');
  await db.sequelize.close();
});

describe('updateMoodReport', () => {
  it('returns a MoodReport', async () => {
    const response = await mutate({ mutation, variables });

    expect(response.data).toBeDefined();

    const { data: { updateMoodReport } } = response;

    expect(updateMoodReport).toBeTruthy();
    expect(updateMoodReport.id).toBeType('string');
    expect(updateMoodReport.score).toBe(variables.score);
    expect(updateMoodReport.doing).toBe(variables.doing);
    expect(updateMoodReport.date).toBeType('string');
    expect(updateMoodReport.createdAt).toBeType('string');
    expect(updateMoodReport.updatedAt).toBeType('string');
    expect(updateMoodReport.goalValues).not.toHaveLength(0);
    expect(updateMoodReport.goalValues[0].id).toBeType('string');
    expect(updateMoodReport.goalValues[0].intValue).toBe(5);
    expect(updateMoodReport.goalValues[1].id).toBeType('string');
    expect(updateMoodReport.goalValues[1].boolValue).toBe(false);
  });
});
