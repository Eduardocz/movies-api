const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(error, stack) {

    console.log("config.dev",config.dev)
    if (config.dev) {
        return { ...error, stack };
    }

    return error;
}

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

function wrapError(err,req,res,next){
    if(err.isBoom){
        next(boom.badImplementation(err));
    }
    next(err);
}

function errorHander(err, req, res, next) {
    console.log("errorHander===>",err)
    const { output: { statusCode, payload } } = err;

    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    wrapError,
    errorHander
}
