import makeGoal from 'tests/factories/goal';
import makeGoalEntry from 'tests/factories/goal-entry';
import makeGoalEntryBool from 'tests/factories/goal-entry-bool';
import makeGoalEntryDef from 'tests/factories/goal-entry-def';
import makeGoalEntryDefBool from 'tests/factories/goal-entry-def-bool';
import makeMoodReport from 'tests/factories/mood-report';

const makeGoalWithEntry = async ({ user }) => {
  const date = new Date();
  const goalEntryDef = await makeGoalEntryDef(); // @todo associate with goalEntryDefBool.
  const goalEntryDefBool = await makeGoalEntryDefBool({ GoalEntryDefId: goalEntryDef.id });
  const moodReport = await makeMoodReport({
    UserId: user.id,
    date,
  });
  const goal = await makeGoal({
    UserId: user.id,
    goalEntryDef: 'goalEntryBool',
    goalEntryDefId: goalEntryDefBool.id,
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
    goalEntryDef,
    goalEntryDefBool,
    moodReport,
  };
};

export default makeGoalWithEntry;
