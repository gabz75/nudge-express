import { makeUser } from 'tests/factories';
import { db, dropModel } from 'tests/utils/use-test-client';

import login, { INVALID_EMAIL_PASSWORD_ERROR } from '~/services/resolvers/mutations/login';

let parent;
const context = { db };
let info;

describe('login', () => {
  beforeAll(async () => {
    await dropModel('User');
    await makeUser({ email: 'gabriel@gmail.com' });
  });

  afterAll(async () => {
    await dropModel('User');
  });

  it('returns a user given a valid email and password', async () => {
    const args = { email: 'gabriel@gmail.com', password: 'qweqweqwe' };
    const response = await login(parent, args, context, info);

    expect(response.success).toBe(true);

    const user = response.data;

    expect(user.id).toBeType('number');
    expect(user.createdAt).toBeType('date');
    expect(user.updatedAt).toBeType('date');
    expect(user.encryptedPassword).toBeType('string');
    expect(user.encryptedPasswordSalt).toBeType('string');
  });

  it('returns an error given invalid args', async () => {
    const args = { password: 'qweqweqwe' };
    const response = await login(parent, args, context, info);

    expect(response.success).toBe(false);
    expect(response.errors.length).toBeGreaterThan(0);
    expect(response.errors).toContain('email is required');
  });

  it('returns an error given an invalid email', async () => {
    const args = { email: 'gabe@gmail.com', password: 'qweqweqwe' };
    const response = await login(parent, args, context, info);

    expect(response.success).toBe(false);
    expect(response.errors.length).toBeGreaterThan(0);
    expect(response.errors).toContain(INVALID_EMAIL_PASSWORD_ERROR);
  });

  it('returns an error given an invalid password', async () => {
    const args = { email: 'gabriel@gmail.com', password: 'qwertyuiop' };
    const response = await login(parent, args, context, info);

    expect(response.success).toBe(false);
    expect(response.errors.length).toBeGreaterThan(0);
    expect(response.errors).toContain(INVALID_EMAIL_PASSWORD_ERROR);
  });
});
