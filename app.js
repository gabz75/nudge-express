import express from 'express';
import jwt from 'express-jwt';

import db from '~/models';
import { createContext } from '~/server/apollo-server-context';
import { createServer } from '~/server/create-server';
import { ENV } from '~/config';

// App
const app = express();

const authMiddleware = jwt({
  secret: ENV.JWT_ENCRYPTION,
  credentialsRequired: false,
});

app.use(authMiddleware);

const context = createContext(db);
const server = createServer(context);

server.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/json');
  res.json({
    code: 200,
    success: true,
    name: 'nudge-express',
    version: '0.0.1',
  });
});

app.listen(ENV.PORT, ENV.HOST);

// eslint-disable-next-line no-console
console.log(`Running on http://${ENV.HOST}:${ENV.PORT}`);
