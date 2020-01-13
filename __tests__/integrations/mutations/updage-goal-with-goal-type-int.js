import { makeUser, makeGoal, makeGoalType, makeGoalTypeInt } from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($id: ID!, $name: String, $color: String, $public: Boolean, $archived: Boolean, $goalType: String, $unit: String) {
    updateGoal(id: $id, name: $name, color: $color, public: $public, archived: $archived, goalType: $goalType, unit: $unit) {
      id
      name
      color
      public
      archived
      createdAt
      updatedAt
      goalTypeImpl {
        id
        goalType {
          id
          type
        }
        ... on GoalTypeInt {
          unit
        }
      }
    }
  }
`;

let goal;

beforeAll(async () => {
  await makeGoalType(); // creates GoalTypeBool
  const user = await makeUser();
  const goalType = await makeGoalType({ type: 'goalTypeInt' });
  const goalTypeInt = await makeGoalTypeInt({ GoalTypeId: goalType.id, unit: 'Miles' });

  goal = await db.sequelize.models.Goal.create({
    name: 'Running',
    color: '#d9d9d9',
    public: true,
    UserId: user.id,
    goalType: 'GoalTypeInt',
    goalTypeId: goalTypeInt.id,
  });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('Goal');
  await dropModel('User');
  await dropModel('GoalTypeInt');
  await dropModel('GoalTypeBool');
  await dropModel('GoalType');
  await db.sequelize.close();
});

describe('updateGoal', () => {
  it('changes the name', async () => {
    const name = 'Swimming';

    expect(goal.name).not.toBe(name);

    const response = await mutate({ mutation, variables: { id: goal.id, name } });

    expect(response.data).toBeDefined();

    const { data: { updateGoal } } = response;

    expect(updateGoal).toBeTruthy();
    expect(updateGoal.id).toBeType('string');
    expect(updateGoal.name).toBe(name);
    expect(updateGoal.color).toBe(goal.color);
    expect(updateGoal.public).toBe(goal.public);
    expect(updateGoal.archived).toBe(goal.archived);
    // expect(updateGoal.createdAt).toBe(goal.createdAt); // @todo: what? fix this
    expect(updateGoal.updatedAt).not.toBe(goal.updatedAt);
    expect(updateGoal.goalTypeImpl).toBeTruthy();
    expect(updateGoal.goalTypeImpl.id).toBeType('string');
    expect(updateGoal.goalTypeImpl.goalType).toBeTruthy();
    expect(updateGoal.goalTypeImpl.goalType.id).toBeType('string');
    expect(updateGoal.goalTypeImpl.goalType.type).toBe('GoalTypeInt');
    expect(updateGoal.goalTypeImpl.unit).toBe('Miles');
  });

  it('archives the goal', async () => {
    const { data: { updateGoal } } = await mutate({ mutation, variables: { id: goal.id, archived: false } });

    expect(updateGoal).toBeTruthy();
    expect(updateGoal.archived).toBe(false);
  });

  it('makes it private', async () => {
    const { data: { updateGoal } } = await mutate({ mutation, variables: { id: goal.id, public: false } });

    expect(updateGoal).toBeTruthy();
    expect(updateGoal.public).toBe(false);
  });

  it('updates the unit', async () => {
    const { data: { updateGoal } } = await mutate({
      mutation,
      variables: {
        id: goal.id,
        unit: 'Kilometers',
      },
    });

    expect(updateGoal).toBeTruthy();
    expect(updateGoal.goalTypeImpl).toBeTruthy();
    expect(updateGoal.goalTypeImpl.unit).toBe('Kilometers');
  });

  it('updates the `goalTypeImpl` to be a GoalTypeBool', async () => {
    const response = await mutate({
      mutation,
      variables: {
        id: goal.id,
        goalType: 'GoalTypeBool',
      },
    });

    expect(response.data).toBeDefined();

    const { data: { updateGoal } } = response;

    expect(updateGoal).toBeTruthy();
    expect(updateGoal.goalTypeImpl).toBeTruthy();
    expect(updateGoal.goalTypeImpl.goalType).toBeTruthy();
    expect(updateGoal.goalTypeImpl.goalType.type).toBe('GoalTypeBool');
  });

  it('returns an error when id is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { id: undefined } });

    expect(errors).toBeType('array');
  });
});
