declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      role: Role;
    };
  }
}


import express from 'express';
import articleRoute from './routes/articleRoute';
import { Role } from '@prisma/client';
import loginRoute from './routes/loginRoute';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', port);

// We tell Express to use the routes we defined
app.use('/api/v1', loginRoute);

app.use('/api/v1/articles', articleRoute);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});