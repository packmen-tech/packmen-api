import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  server: {
    hostname: process.env.SERVER_HOSTNAME || 'localhost',
    port: process.env.SERVER_PORT ? +process.env.SERVER_PORT : 3000
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
  },
  security: {
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET,
      expiresIn: process.env.SECURITY_JWT_EXPIRES_IN,
      issuer: process.env.SECURITY_JWT_ISSUER
    }
  }
};

export default config;
