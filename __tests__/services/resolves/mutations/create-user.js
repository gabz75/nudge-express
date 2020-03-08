import { db, dropModel } from 'tests/utils/use-test-client';

import createUser from '~/services/resolvers/mutations/create-user';

let parent;
const context = { db };
let info;

describe('createUser', () => {
  afterAll(async () => {
    await dropModel('User');
  });

  it('creates a user', async () => {
    const args = { email: 'gabriel@gmail.com', password: 'qweqweqwe' };
    const response = await createUser(parent, args, context, info);

    expect(response.success).toBe(true);

    const user = response.data;

    expect(user.id).toBeType('number');
    expect(user.createdAt).toBeType('date');
    expect(user.updatedAt).toBeType('date');
    expect(user.encryptedPassword).toBeType('string');
    expect(user.encryptedPasswordSalt).toBeType('string');
  });

  it('returns an error when the email is missing', async () => {
    const args = { password: 'qweqweqwe' };
    const response = await createUser(parent, args, context, info);

    expect(response.success).toBe(false);
    expect(response.errors.length).toBeGreaterThan(0);
    expect(response.errors).toContain('email is required');
  });
});
