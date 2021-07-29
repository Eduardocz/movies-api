const { query } = require('express');
const MongoLib = require('../lib/mongo');


class MoviesService {

    constructor() {
        this.collection = 'movies';
        this.mongoBD = new MongoLib();
    }

    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const movies = await this.mongoBD.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({ movieId }) {
        const movie = await this.mongoBD.get(this.collection, movieId);
        return movie || {};
    }

    async createMovie({ movie }) {
        const createMovieId = await this.mongoBD.create(this.collection, movie);
        return createMovieId;
    }

    async updateMovie({ movieId, movie }) {
        const updateMovieId = await this.mongoBD.update(this.collection, movieId, movie);
        return updateMovieId;
    }

    async deleteMovie({ movieId }) {
        const deleteMovieId = await this.mongoBD.delete(this.collection, movieId);
        return deleteMovieId;
    }
}

module.exports = MoviesService;