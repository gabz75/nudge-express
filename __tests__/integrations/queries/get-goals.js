import { makeUser, makeGoal } from 'tests/factories';
import { setAuthenticatedUser } from 'tests/utils/apollo-server-context';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { query } = useTestClient();

const GET_GOALS = `
  query {
    getGoals {
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

let user;

beforeAll(async () => {
  user = await makeUser();

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('User');
  await db.sequelize.close();
});

describe('getGoals', () => {
  it('returns an empty list', async () => {
    const { data: { getGoals } } = await query({ query: GET_GOALS });

    expect(getGoals).toBeType('array');
    expect(getGoals.length).toBe(0);
  });
});


describe('with goals', () => {
  beforeAll(async () => {
    await makeGoal({ UserId: user.id });
    await makeGoal({ UserId: user.id });

    // this data should no show as a result of the getGoals
    const bob = await makeUser();
    await makeGoal({ UserId: bob.id });
  });

  afterAll(async () => {
    await dropModel('Goal');
  });

  it('returns goals', async () => {
    const { data: { getGoals } } = await query({ query: GET_GOALS });

    expect(getGoals).toBeType('array');
    expect(getGoals.length).toBe(2);
  });
});
