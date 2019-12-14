import makeUser from 'tests/factories/user';
import { useTestClient, db, dropModel } from 'tests/utils/use-test-client';

const { mutate } = useTestClient();

const mutation = `
  mutation($email: String!, $name: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
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

beforeEach(async () => {
  await dropModel('User');
});

afterEach(async () => {
  await dropModel('User');
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('createUser', () => {
  it('returns a new user', async () => {
    const { data: { createUser } } = await mutate({ mutation, variables });

    expect(createUser).toBeTruthy();
    expect(createUser.id).toBeType('string');
    expect(createUser.name).toBe(variables.name);
    expect(createUser.email).toBe(variables.email);
    expect(createUser.jwt).toBeType('string');
    expect(createUser.createdAt).toBeType('string');
    expect(createUser.updatedAt).toBeType('string');
  });

  it('returns an error when name is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, name: undefined } });

    expect(errors).toBeTruthy();
  });

  it('returns an error when email is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, email: undefined } });

    expect(errors).toBeTruthy();
  });

  it('returns an error when password is missing', async () => {
    const { errors } = await mutate({ mutation, variables: { ...variables, password: undefined } });

    expect(errors).toBeTruthy();
  });

  describe('when email is already taken', () => {
    let user;

    beforeEach(async () => {
      user = await makeUser({ email: variables.email });
    });

    afterEach(async () => {
      await user.destroy();
    });

    it('returns an error', async () => {
      const { errors } = await mutate({ mutation, variables });

      // @todo: have a better error response returned to the frontend.
      // console.log(errors[0].extensions.exception.errors);

      expect(errors).toBeTruthy();
    });
  });
});
