import {
  makeUser,
  makeGoalTypeBool,
  makeGoalTypeInt,
} from 'tests/factories';
import { db, dropModel } from 'tests/utils/use-test-client';

const { Goal, GoalTypeInt } = db.sequelize.models;

describe('Goal', () => {
  let user;

  beforeEach(async () => {
    user = await makeUser();
  });

  afterEach(async () => {
    await dropModel('GoalTypeInt');
    await dropModel('GoalTypeBool');
    await dropModel('GoalType');
    await dropModel('Goal');
    await dropModel('User');
  });

  it('creates a GoalType with a GoalTypeBool polymorphic relationship', async () => {
    const goalTypeBool = await makeGoalTypeBool();

    expect(goalTypeBool.id).toBeDefined();

    const goal = await Goal.create({
      UserId: user.id,
      goalTypeId: goalTypeBool.id,
      goalType: 'GoalTypeBool',
    });

    expect(goal.id).toBeDefined();

    const relationship = await goal.getGoalTypeBool();
    const relationship2 = await goal.getGoalTypeInt();

    expect(relationship.id).toBe(goalTypeBool.id);
    expect(relationship2).toBeNull();
  });

  it('creates a GoalType with a GoalTypeInt polymorphic relationship', async () => {
    const goalTypeInt = await makeGoalTypeInt();

    expect(goalTypeInt.id).toBeDefined();

    const goal = await Goal.create({
      UserId: user.id,
      goalTypeId: goalTypeInt.id,
      goalType: 'GoalTypeInt',
    });

    expect(goal.id).toBeDefined();

    const relationship = await goal.getGoalTypeBool();
    const relationship2 = await goal.getGoalTypeInt();

    expect(relationship).toBeNull();
    expect(relationship2.id).toBe(goalTypeInt.id);
  });

  describe('given an existing GoalTypeInt polymorphic relationship', () => {
    let goal;

    beforeEach(async () => {
      const goalTypeInt = await makeGoalTypeInt();

      goal = await Goal.create({
        UserId: user.id,
        goalTypeId: goalTypeInt.id,
        goalType: 'GoalTypeInt',
      });
    });

    it('has a polymorphic getter', () => {
      expect(goal.getGoalType).toBeType('function');
    });

    it('returns the polymmorphic association GoalTypeInt', async () => {
      const goalTypeInt = await goal.getGoalType();

      expect(goalTypeInt).toBeDefined();
      expect(goalTypeInt).toBeInstanceOf(GoalTypeInt);
      expect(goalTypeInt.id).toBe(goal.goalTypeId);
    });
  });
});
