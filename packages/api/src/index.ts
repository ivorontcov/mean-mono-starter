import express from 'express';
import mongoose from 'mongoose';
import router from './router';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

require('dotenv').config();

const connectionString = process.env.MONGO_DB_CONNECTION || 'mongodb://db:27017/ProjectDb';
const dbName = process.env.MONGO_DB_NAME || 'ProjectDb';
const port = process.env.EXPRESS_PORT || 8080;
const authUrl = process.env.AUTH_URL;

mongoose.connect(connectionString, {
  dbName: dbName,
});

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

if (!process.env.NO_AUTH) {
  app.use(
    expressjwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authUrl}/.well-known/jwks.json`,
      }) as any,
      algorithms: ['RS256'],
      issuer: authUrl,
    })
  );
} else {
  console.warn('WARNING: Running without authentication');
  app.use((req, res, next) => {
    (req as any).auth = {
      name: 'noauth',
    };
    next();
  });
}

app.use('/', router);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err) {
    console.error(err);
    const status = err.status || 500;
    res.status(status).send(err.message);
  }
});

app.listen(port, () => {
  console.log('Workflow API listening on port ', port);
});
