// routes/movies.js
const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// List all movies
router.get('/', moviesController.getAllMovies);

// Get movie details
router.get('/:imdb_id', moviesController.getMovieDetails);

// Get movies by year
router.get('/year/:year', moviesController.getMoviesByYear);

// Get movies by genre
router.get('/genre/:genre', moviesController.getMoviesByGenre);

module.exports = router;
