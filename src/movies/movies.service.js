const knex = require("../db/connection");

// table query to handle `GET /movies?is_showing=true`
// shows movies where the movie is currently showing in theaters
// uses movies and `movies_theaters` table.
function list(isShowing) {
    if (isShowing) {
        return knex("movies")
            .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
            .distinct()
            .select("movies.*")
            .where({ is_showing: true });
    }
    return knex("movies").select("*");
}

// table query to handle `GET /movies/:movieId`
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first();
}

module.exports = {
    list,
    read,
};