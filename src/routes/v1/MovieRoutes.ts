import { Router } from 'express';
import { getMovies, searchMovies, addMovie, updateMovie, deleteMovie } from '../../controllers/MovieController';

const router = Router();

router.get('/', getMovies);
router.get('/search', searchMovies);
router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
