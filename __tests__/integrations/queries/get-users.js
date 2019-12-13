import faker from 'faker';
import { setAuthenticatedUser } from '../../utils/apollo-server-context';
import { useTestClient, db, dropModel } from '../../utils/use-test-client';

const { query } = useTestClient();

const GET_USERS = `
  query {
    getUsers {
      id
      name
      email
      jwt
    }
  }
`;

const users = [];

beforeAll(async () => {
  users.push(await db.sequelize.models.User.create({
    name: 'Gabe',
    email: faker.internet.email(),
    password: 'qweqweqwe',
  }));

  users.push(await db.sequelize.models.User.create({
    name: 'Charles',
    email: faker.internet.email(),
    password: 'qweqweqwe',
  }));

  setAuthenticatedUser(users[0]);
});

afterAll(async () => {
  await dropModel('User');
});

describe('getUsers', () => {
  it('returns a list of users', async () => {
    const { data: { getUsers } } = await query({ query: GET_USERS });

    expect(getUsers).toBeType('array');
    expect(getUsers.length).toBe(2);
    expect(parseInt(getUsers[0].id, 10)).toBe(users[0].id);
    expect(parseInt(getUsers[1].id, 10)).toBe(users[1].id);
  });

  it('shows jwt only for the authenticatedUser', async () => {
    const { data: { getUsers } } = await query({ query: GET_USERS });

    expect(getUsers.length).toBe(2);
    expect(getUsers[0].jwt).not.toBeNull();
    expect(getUsers[1].jwt).toBeNull();
  });
});
