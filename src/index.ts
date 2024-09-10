import express from 'express';
import articleRoute from './routes/articleRoute';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', port);

// We tell Express to use the routes we defined
app.use('/api/v1/articles', articleRoute);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
