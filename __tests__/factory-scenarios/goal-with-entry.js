import {
  makeGoal,
  makeGoalValue,
  makeGoalType,
  makeGoalTypeBool,
  makeMoodReport,
} from 'tests/factories';

const scenarioGoalWithValues = async ({ user }) => {
  const date = new Date();
  const goalType = await makeGoalType();
  const goalTypeBool = await makeGoalTypeBool({ GoalTypeId: goalType.id });
  const moodReport = await makeMoodReport({
    UserId: user.id,
    date,
  });
  const goal = await makeGoal({
    UserId: user.id,
    goalType: 'GoalTypeBool',
    goalTypeId: goalTypeBool.id,
  });
  const goalValue = await makeGoalValue({
    GoalId: goal.id,
    MoodReportId: moodReport.id,
    boolValue: true,
  });

  return {
    goal,
    goalValue,
    goalType,
    goalTypeBool,
    moodReport,
  };
};

export default scenarioGoalWithValues;
