
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const moviesDbPath = path.resolve('Aetna Code Test', 'db', 'movies.db');

const ratingDbPath = path.resolve('Aetna Code Test', 'db', 'ratings.db');

// Connect to movies.db
const movieDb = new sqlite3.Database(moviesDbPath, (err) => {
  if (err) {
    console.error('Could not connect to movies.db:', err.message);
  } else {
    console.log(' Connected to movies.db');
  }
});

// Connect to rating.db
const ratingDb = new sqlite3.Database(ratingDbPath, (err) => {
  if (err) {
    console.error('Could not connect to rating.db:', err.message);
  } else {
    console.log('Connected to rating.db');
  }
});

module.exports = { movieDb, ratingDb };
