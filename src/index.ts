import express from 'express';
import articleRoute from './routes/articleRoute';

const app = express();
const port = 3000;

// We tell Express to use the routes we defined
app.use('/api/v1', articleRoute);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
