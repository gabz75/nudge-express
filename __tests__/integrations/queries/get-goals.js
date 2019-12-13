import faker from 'faker';
import { setAuthenticatedUser } from '../../utils/apollo-server-context';
import { useTestClient, db, dropModel } from '../../utils/use-test-client';

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
  user = await db.sequelize.models.User.create({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'qweqweqwe',
  });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('User');
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
    await db.sequelize.models.Goal.create({
      name: 'Meditate',
      color: faker.internet.color(),
      UserId: user.id,
    });

    await db.sequelize.models.Goal.create({
      name: 'Run',
      color: faker.internet.color(),
      UserId: user.id,
    });

    // this data should no show as a result of the getGoals
    const bob = await db.sequelize.models.User.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: 'qweqweqwe',
    });

    await db.sequelize.models.Goal.create({
      name: 'I am running too!',
      color: faker.internet.color(),
      UserId: bob.id,
    });
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
