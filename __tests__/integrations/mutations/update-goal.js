import { setAuthenticatedUser } from '../../utils/apollo-server-context';
import { useTestClient, db, dropModel } from '../../utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($id: ID!, $name: String, $color: String, $public: Boolean, $archived: Boolean) {
    updateGoal(id: $id, name: $name, color: $color, public: $public, archived: $archived) {
      id
      name
      color
      public
      archived
      createdAt
      updatedAt
    }
  }
`;

let goal;

beforeAll(async () => {
  const user = await db.sequelize.models.User.create({
    name: 'Gabe',
    email: 'gabriel@gmail.com',
    password: 'qweqweqwe',
  });

  goal = await db.sequelize.models.Goal.create({
    name: 'Medidate',
    color: '#d9d9d9',
    public: true,
    UserId: user.id,
  });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('Goal');
  await dropModel('User');
  await db.sequelize.close();
});

describe('updateGoal', () => {
  it('changes the name', async () => {
    const name = 'Exercise';

    expect(goal.name).not.toBe(name);

    const { data: { updateGoal } } = await mutate({ mutation, variables: { id: goal.id, name } });

    expect(updateGoal).toBeTruthy();
    expect(updateGoal.id).toBeType('string');
    expect(updateGoal.name).toBe(name);
    expect(updateGoal.color).toBe(goal.color);
    expect(updateGoal.public).toBe(goal.public);
    expect(updateGoal.archived).toBe(goal.archived);
    // expect(updateGoal.createdAt).toBe(goal.createdAt); // @todo: what? fix this
    expect(updateGoal.updatedAt).not.toBe(goal.updatedAt);
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

  it('returns an error when id is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { id: undefined } });

    expect(errors).toBeType('array');
  });
});
