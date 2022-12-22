export const ErrorHandler = (e, req, res, next) => {
    e.statusCode = e.statusCode || 500;

    if (e.code === 11000) {
        e.statusCode = 400;
        for (let p in e.keyValue) {
            e.message = `${p} have to be unique`;
        }
    }

    if (e.kind === 'ObjectId') {
        e.statusCode = 404;
        e.message = `The ${req.originalUrl} is not found because of wrong ID`;
    }

    res.status(e.statusCode).json({
        status: 'fail',
        message: e.message,
    });
};
