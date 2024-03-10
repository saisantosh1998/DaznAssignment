import mongoose, { Document } from 'mongoose';
import { Movie } from '../interfaces/Movie';



const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  streamingLink: { type: String, required: true },
});

export default mongoose.model<Movie>('Movie', MovieSchema);
