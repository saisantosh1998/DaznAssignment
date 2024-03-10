import * as movieService from '../../src/services/MovieService';
import MovieModel from '../../src/models/Movie';
import { Movie } from '../../src/interfaces/Movie';

jest.mock('../../src/models/Movie');

describe('movieService', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('getAllMovies should call find method of MovieModel', async () => {
        await movieService.getAllMovies();
        expect(MovieModel.find).toHaveBeenCalledWith();
    });

    it('searchMovies should call find method of MovieModel with the correct query', async () => {
        await movieService.searchMovies('Action');
        expect(MovieModel.find).toHaveBeenCalledWith({
            $or: [
                { title: { $regex: new RegExp('Action', 'i') } },
                { genre: { $regex: new RegExp('Action', 'i') } },
            ],
        });
    });

    it('addMovie should call create method of MovieModel with the correct data', async () => {
        const mockMovieData: Movie = { title: 'New Movie', genre: 'Action', rating: 8.5, streamingLink: 'http://example.com' };
        await movieService.addMovie(mockMovieData);
        expect(MovieModel.create).toHaveBeenCalledWith(mockMovieData);
    });

    it('updateMovie should call findByIdAndUpdate method of MovieModel with the correct id and data', async () => {
        const mockMovieId = 'movieId';
        const mockUpdatedMovieData = { title: 'Updated Movie', genre: 'Sci-Fi' };
        await movieService.updateMovie(mockMovieId, mockUpdatedMovieData);
        expect(MovieModel.findByIdAndUpdate).toHaveBeenCalledWith(mockMovieId, mockUpdatedMovieData, { new: true });
    });

    it('deleteMovie should call findByIdAndDelete method of MovieModel with the correct id', async () => {
        const mockMovieId = 'movieId';
        await movieService.deleteMovie(mockMovieId);
        expect(MovieModel.findByIdAndDelete).toHaveBeenCalledWith(mockMovieId);
    });

});
