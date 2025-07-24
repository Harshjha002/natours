import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/toursRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Middleware ✅');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
