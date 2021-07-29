const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js')

const {logErrors, errorHander } = require('./utils/middleware/errorHandlers.js')

app.use(express.json());
moviesApi(app);

app.use(logErrors);
app.use(errorHander);


app.listen((config.port), function () {
    console.log(`Server corriendo en http://localhost:${config.port}`)
});