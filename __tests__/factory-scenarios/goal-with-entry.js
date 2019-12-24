import makeGoal from 'tests/factories/goal';
import makeGoalEntry from 'tests/factories/goal-entry';
import makeGoalEntryBool from 'tests/factories/goal-entry-bool';
import makeGoalType from 'tests/factories/goal-type';
import makeGoalTypeBool from 'tests/factories/goal-type-bool';
import makeMoodReport from 'tests/factories/mood-report';

const makeGoalWithEntry = async ({ user }) => {
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
  const goalEntryBool = await makeGoalEntryBool({
    value: true,
    date,
  });
  const goalEntry = await makeGoalEntry({
    GoalId: goal.id,
    MoodReportId: moodReport.id,
    goalEnterable: 'goalEntryBool',
    goalEnterableId: goalEntryBool.id,
    date,
  });

  return {
    goal,
    goalEntry,
    goalEntryBool,
    goalType,
    goalTypeBool,
    moodReport,
  };
};

export default makeGoalWithEntry;
