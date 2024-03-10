import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../src/index';
import MovieModel from '../../src/models/Movie';
import config from '../../src/config/config';

describe('Integration tests for movie routes', () => {
    beforeAll(async () => {
        // Connect to a test database
        await mongoose.connect(config.mongoDBUrl);
    });

    afterAll(async () => {
        // Disconnect from the test database
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clear the test database before each test
        await MovieModel.deleteMany({});
    });

    it('GET /movies should return an empty array when no movies are available', async () => {
        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('GET /movies/search?q=action should return an empty array when no matching movies are available', async () => {
        const response = await request(app).get('/movies/search?q=action');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('POST /movies should add a new movie', async () => {
        const newMovie = {
            title: 'Inception',
            genre: 'Sci-Fi',
            rating: 9.3,
            streamingLink: 'https://example.com',
        };

        const response = await request(app).post('/movies').send(newMovie);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newMovie.title);

        const moviesInDatabase = await MovieModel.find();
        expect(moviesInDatabase.length).toBe(1);
        expect(moviesInDatabase[0].title).toBe(newMovie.title);
    });

    it('PUT /movies/:id should update an existing movie', async () => {
        const existingMovie = new MovieModel({
            title: 'The Dark Knight',
            genre: 'Action',
            rating: 9.0,
            streamingLink: 'https://example.com/darkknight',
        });

        await existingMovie.save();

        const updatedMovieData = {
            title: 'Updated Dark Knight',
            genre: 'Action',
            rating: 9.5,
            streamingLink: 'https://example.com/updateddarkknight',
        };

        const response = await request(app).put(`/movies/${existingMovie._id}`).send(updatedMovieData);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedMovieData.title);

        const moviesInDatabase = await MovieModel.find();
        expect(moviesInDatabase.length).toBe(1);
        expect(moviesInDatabase[0].title).toBe(updatedMovieData.title);
    });

    it('DELETE /movies/:id should delete an existing movie', async () => {
        const existingMovie = new MovieModel({
            title: 'Inception',
            genre: 'Sci-Fi',
            rating: 9.3,
            streamingLink: 'https://example.com/inception',
        });

        await existingMovie.save();

        const response = await request(app).delete(`/movies/${existingMovie._id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Movie deleted successfully');

        const moviesInDatabase = await MovieModel.find();
        expect(moviesInDatabase.length).toBe(0);
    });

});
