const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js')

const {logErrors, wrapError, errorHander } = require('./utils/middleware/errorHandlers.js');
const notFoundHandler  = require('./utils/middleware/notFoundHandler.js');

app.use(express.json());

//routes
moviesApi(app);

//catch 404
app.use(notFoundHandler);

//validaciones
app.use(logErrors);
app.use(wrapError);
app.use(errorHander);


app.listen((config.port), function () {
    console.log(`Server corriendo en http://localhost:${config.port}`)
});