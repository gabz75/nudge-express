import express from 'express';
import jwt from 'express-jwt';

import server from './server';
import { ENV } from './config';

// App
const app = express();

const authMiddleware = jwt({
  secret: ENV.JWT_ENCRYPTION,
  credentialsRequired: false,
});

app.use(authMiddleware);

app.use((err, req, res /* , next */) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ code: 401, success: false, message: `${err.name}: ${err.message}` });
  }

  return res.status(400).json({ code: 400, success: false, message: `${err.name}: ${err.message}` });
});

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
