const express = require('express');
const MoviesService = require('../services/movies');
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies')

const validateHandler = require('../utils/middleware/validationHandlres')

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    router.get("/", async function (req, res, next) {
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });

        } catch (err) {
            next(err)
        }
    });

    router.get("/:movieId", validateHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;

        try {
            const movie = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data: movie,
                message: 'movie retrived'
            });

        } catch (err) {
            next(err)
        }
    });

    router.post("/", validateHandler(createMovieSchema), async function (req, res, next) {

        const { body: movie } = req;
        try {
            const createdMovieId = await moviesService.createMovie({ movie })

            res.status(201).json({
                data: createdMovieId,
                message: 'movies created'
            });

        } catch (err) {
            next(err)
        }
    });

    router.put("/:movieId", validateHandler({ movieId: movieIdSchema }, 'params'), validateHandler(updateMovieSchema), async function (req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {

            const updatedMovieId = await moviesService.updateMovie({ movieId, movie })

            res.status(200).json({
                data: updatedMovieId,
                message: 'movies updated'
            });

        } catch (err) {
            next(err)
        }
    });

    router.delete("/:movieId", validateHandler({ movieId: movieIdSchema }, 'params'), async function (req, res, next) {
        const { movieId } = req.params;
        try {

            const deleteMovieId = await moviesService.deleteMovie({ movieId })

            res.status(200).json({
                data: deleteMovieId,
                message: 'movie delete'
            });

        } catch (err) {
            next(err)
        }
    });

}

module.exports = moviesApi;