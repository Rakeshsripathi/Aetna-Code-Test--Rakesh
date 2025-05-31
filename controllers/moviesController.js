const { movieDb, ratingDb } = require('../db/db');  // Use both DBs

const formatDollar = num => `$${parseInt(num).toLocaleString()}`;

// List all movies (paginated)
exports.getAllMovies = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 50;
  const offset = (page - 1) * limit;

  const query = `
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    LIMIT ? OFFSET ?
  `;

  movieDb.all(query, [limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const movies = rows.map(row => ({
      imdb_id: row.imdbId,
      title: row.title,
      genres: JSON.parse(row.genres || '[]'),
      release_date: row.releaseDate,
      budget: formatDollar(row.budget)
    }));

    res.json(movies);
  });
};

// Get full movie details
exports.getMovieDetails = (req, res) => {
  const imdbId = req.params.imdb_id;

  const movieQuery = `
    SELECT * FROM movies WHERE imdbId = ?
  `;

  const ratingQuery = `
    SELECT AVG(rating) AS average_rating FROM ratings WHERE movieId = ?
  `;

  movieDb.get(movieQuery, [imdbId], (err, movie) => {
    if (err || !movie) return res.status(404).json({ error: 'Movie not found' });

    ratingDb.get(ratingQuery, [imdbId], (err2, ratingResult) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const details = {
        imdb_id: movie.imdbId,
        title: movie.title,
        description: movie.description,
        release_date: movie.releaseDate,
        budget: formatDollar(movie.budget),
        runtime: movie.runtime,
        average_rating: ratingResult?.average_rating?.toFixed(2) || 'N/A',
        genres: JSON.parse(movie.genres || '[]'),
        original_language: movie.original_language,
        production_companies: JSON.parse(movie.production_companies || '[]')
      };

      res.json(details);
    });
  });
};

// List movies by year
exports.getMoviesByYear = (req, res) => {
  const year = req.params.year;
  const sort = req.query.sort === 'desc' ? 'DESC' : 'ASC';
  const page = parseInt(req.query.page) || 1;
  const limit = 50;
  const offset = (page - 1) * limit;

  const query = `
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    WHERE strftime('%Y', releaseDate) = ?
    ORDER BY releaseDate ${sort}
    LIMIT ? OFFSET ?
  `;

  movieDb.all(query, [year, limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const movies = rows.map(row => ({
      imdb_id: row.imdbId,
      title: row.title,
      genres: JSON.parse(row.genres || '[]'),
      release_date: row.releaseDate,
      budget: formatDollar(row.budget)
    }));

    res.json(movies);
  });
};

// List movies by genre
exports.getMoviesByGenre = (req, res) => {
  const genre = req.params.genre.toLowerCase();
  const page = parseInt(req.query.page) || 1;
  const limit = 50;
  const offset = (page - 1) * limit;

  const query = `
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    WHERE LOWER(genres) LIKE ?
    LIMIT ? OFFSET ?
  `;

  movieDb.all(query, [`%${genre}%`, limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const movies = rows.map(row => ({
      imdb_id: row.imdbId,
      title: row.title,
      genres: JSON.parse(row.genres || '[]'),
      release_date: row.releaseDate,
      budget: formatDollar(row.budget)
    }));

    res.json(movies);
  });
};
