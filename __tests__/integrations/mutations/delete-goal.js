import { setAuthenticatedUser } from '../../utils/apollo-server-context';
import { useTestClient, db } from '../../utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($id: ID!) {
    deleteGoal(id: $id) {
      id
      name
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

describe('deleteGoal', () => {
  it('returns a goal', async () => {
    const { data: { deleteGoal } } = await mutate({ mutation, variables: { id: goal.id } });

    expect(deleteGoal).toBeTruthy();
    expect(deleteGoal.id).toBeType('string');
    expect(deleteGoal.name).toBe(goal.name);
  });

  it('returns an error when id is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { id: undefined } });

    expect(errors).toBeType('array');
  });
});
