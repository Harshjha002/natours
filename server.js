import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const DB = process.env.DB_STRING;

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
