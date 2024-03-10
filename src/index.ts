import express, { Application} from 'express';
import mongoose from 'mongoose';
import movieRoutes from './routes/v1/MovieRoutes';
import { errorHandler } from './middlewares/error';
import config from './config/config';

export const app: Application = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoDBUrl);

// Use movie routes
app.use('/movies', movieRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});

module.exports = {app};