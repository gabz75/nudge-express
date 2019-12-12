import { createTestClient } from 'apollo-server-testing';

import * as models from '../../models';
import { createContext } from './apollo-server-context';
import { createServer } from '../../server/create-server';

const context = createContext(models);
const server = createServer(context);
const testClient = createTestClient(server);

export const useTestClient = () => testClient;

export const db = models;

export default {
  useTestClient,
  db,
};
