import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || '3000',
  HOST: process.env.HOST || '0.0.0.0',

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'secureKey',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1y',
};
