import { Request, Response, NextFunction } from 'express';
import * as movieController from '../../src/controllers/MovieController';
import * as movieService from '../../src/services/MovieService';
import { Movie } from '../../src/interfaces/Movie';

describe('movieController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;
  const mockMovies: Movie[] = [
    { title: 'Movie 1', genre: 'Genre 1', rating: 5, streamingLink: 'https://example.com/1' },
    { title: 'Movie 2', genre: 'Genre 2', rating: 4, streamingLink: 'https://example.com/2' }
  ];
  const updatedMovie = { title: 'Updated Movie 1', genre: 'Genre 1', rating: 5, streamingLink: 'https://example.com/1' };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return all movies', async () => {
    const getAllMoviesMock = jest.spyOn(movieService, 'getAllMovies');
    getAllMoviesMock.mockResolvedValue(mockMovies);

    await movieController.getMovies(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(mockMovies);
  });

  it('should search for movies by a keyword', async () => {
    const keyword = 'action';
    const searchMoviesMock = jest.spyOn(movieService, 'searchMovies');
    searchMoviesMock.mockResolvedValue(mockMovies);

    mockRequest.query = { keyword };

    await movieController.searchMovies(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(mockMovies);
  });

  it('should update a movie by ID', async () => {
    const updateMovieMock = jest.spyOn(movieService, 'updateMovie');
    updateMovieMock.mockResolvedValue(updatedMovie);

    mockRequest.params = { id: '123' };
    mockRequest.body = { title: 'Updated Movie 1' };

    await movieController.updateMovie(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(updatedMovie);
  });

  it('should delete a movie by ID', async () => {
    const deletedMovieMessage = { message: 'Movie deleted successfully' };
    const deleteMovieMock = jest.spyOn(movieService, 'deleteMovie');
    deleteMovieMock.mockResolvedValue(deletedMovieMessage);
  
    mockRequest.params = { id: '123' };
  
    await movieController.deleteMovie(mockRequest, mockResponse, mockNext);
  
    expect(mockResponse.json).toHaveBeenCalledWith(deletedMovieMessage);
  });
  

  it('should handle errors when fetching movies', async () => {
    const errorMessage = 'Internal Server Error';
    const getAllMoviesMock = jest.spyOn(movieService, 'getAllMovies');
    getAllMoviesMock.mockRejectedValue(new Error(errorMessage));

    await movieController.getMovies(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when updating a movie', async () => {
    const errorMessage = 'Internal Server Error';
    const updateMovieMock = jest.spyOn(movieService, 'updateMovie');
    updateMovieMock.mockRejectedValue(new Error(errorMessage));

    mockRequest.params = { id: '123' };
    mockRequest.body = { title: 'Updated Movie 1' };

    await movieController.updateMovie(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
  });

  it('should handle errors when deleting a movie', async () => {
    const errorMessage = 'Internal Server Error';
    const deleteMovieMock = jest.spyOn(movieService, 'deleteMovie');
    deleteMovieMock.mockRejectedValue(new Error(errorMessage));

    mockRequest.params = { id: '123' };

    await movieController.deleteMovie(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
