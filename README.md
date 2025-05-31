# 🎬 Movie API Code Test

This is a RESTful API built with **Node.js** and **SQLite3**, based on a code challenge specification. It allows users to browse, filter, and view movie details from a pre-provided SQLite database.
Aetna Code Test/
├── app.js # Entry point
├── db/
│ ├── movies.db # SQLite3 database with movie data
│ └── ratings.db # SQLite3 database with rating data
├── db/
│ └── db.js # DB connection
├── models/
│ └── movieModel.js # Logic for querying movie data
├── routes/
│ └── movieRoutes.js # Express routes
├── package.json
└── README.md # You're here

Running the App
bash
Copy
Edit
npm start
# or for development
npm run dev


GET http://localhost:3000/movies?page=1
GET http://localhost:3000/movies/tt0094675
GET http://localhost:3000/movies/year/1995?page=1&sort=asc
GET http://localhost:3000/movies/genre/comedy?page=1



