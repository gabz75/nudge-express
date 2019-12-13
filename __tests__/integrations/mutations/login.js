import { useTestClient, db, dropModel } from '../../utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      jwt
      createdAt
      updatedAt
    }
  }
`;

const variables = { name: 'Gabe', email: 'gabriel@gmail.com', password: 'qweqweqwe' };

beforeAll(async () => {
  await db.sequelize.models.User.create(variables);
});

afterAll(async () => {
  await dropModel('User');
  await db.sequelize.close();
});

describe('login', () => {
  it('returns a user', async () => {
    const { email, password } = variables;

    const { data: { login } } = await mutate({ mutation, variables: { email, password } });

    expect(login).toBeTruthy();
    expect(login.id).toBeType('string');
    expect(login.name).toBeTruthy();
    expect(login.email).toBe(email);
    expect(login.jwt).toBeType('string');
    expect(login.createdAt).toBeType('string');
    expect(login.updatedAt).toBeType('string');
  });

  test.skip('returns an error when password is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, password: null } });

    expect(errors).toBeTruthy();
  });

  test('returns an error when email is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, email: null } });

    expect(errors).toBeType('array');
  });
});
