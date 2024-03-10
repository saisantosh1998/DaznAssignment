import { Movie } from '../interfaces/Movie';
import MovieModel from '../models/Movie';
const SEARCH_CACHE_PREFIX = 'search_';

export const getAllMovies = async (): Promise<Movie[]> => {
  return MovieModel.find();
};

export const searchMovies = async (query: string): Promise<Movie[]> => {

  const resultFromDB: Movie[] = await MovieModel.find({
    $or: [
      { title: { $regex: new RegExp(query, 'i') } },
      { genre: { $regex: new RegExp(query, 'i') } },
    ],
  });

  return resultFromDB
};

export const addMovie = async (movieData: Movie): Promise<Movie> => {
  return MovieModel.create(movieData);
};

export const updateMovie = async (id: string, movieData: Partial<Movie>): Promise<Movie | null> => {
  return MovieModel.findByIdAndUpdate(id, movieData, { new: true });
};

export const deleteMovie = async (id: string): Promise<Object | null> => {
  return MovieModel.findByIdAndDelete(id);
};
