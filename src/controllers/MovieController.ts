import { Request, Response, NextFunction } from 'express';
import * as movieService from '../services/MovieService';

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const searchMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    const movies = await movieService.searchMovies(String(q));
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await movieService.addMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await movieService.deleteMovie(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    next(error);
  }
};
