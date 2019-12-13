import faker from 'faker';
import { setAuthenticatedUser } from '../../utils/apollo-server-context';
import { useTestClient, db, dropModel } from '../../utils/use-test-client';

const { query } = useTestClient();

const GET_GOAL = `
  query($id: ID!) {
    getGoal(id: $id) {
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
let bobsGoal;
let goal;

beforeAll(async () => {
  user = await db.sequelize.models.User.create({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'qweqweqwe',
  });

  goal = await db.sequelize.models.Goal.create({
    name: 'Meditate',
    color: faker.internet.color(),
    UserId: user.id,
  });

  setAuthenticatedUser(user);
});

afterAll(async () => {
  await dropModel('Goal');
  await dropModel('User');
});

describe('getGoal', () => {
  it('returns a goal', async () => {
    const { data: { getGoal } } = await query({ query: GET_GOAL, variables: { id: goal.id } });

    expect(getGoal).toBeType('object');
    expect(getGoal.id).toBe(goal.id.toString());
    expect(getGoal.name).toBe(goal.name);
  });

  it('returns an error when given an invalid ID', async () => {
    const { errors } = await query({ query: GET_GOAL, variables: { id: undefined } });

    expect(errors).toBeType('array');
  });

  // @todo: should consider returning a 404
  it('returns no error and no data for an valid but non-existing ID', async () => {
    const { data: { getGoal }, errors } = await query({ query: GET_GOAL, variables: { id: -1 } });

    expect(getGoal).toBeNull();
    expect(errors).toBeUndefined();
  });
});

describe("given someonelse's goal", () => {
  beforeAll(async () => {
    // this data should no show as a result of the getGoal
    const bob = await db.sequelize.models.User.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: 'qweqweqwe',
    });

    bobsGoal = await db.sequelize.models.Goal.create({
      name: 'I am running too!',
      color: faker.internet.color(),
      UserId: bob.id,
    });
  });

  it('returns no error and no data', async () => { // @todo: should consider returning a 403
    const { data: { getGoal }, errors } = await query({ query: GET_GOAL, variables: { id: bobsGoal.id } });

    expect(getGoal).toBeNull();
    expect(errors).toBeUndefined();
  });
});
