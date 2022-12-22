import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const Authorization = req.header('Authorization');
    if (!Authorization) {
        const e = new Error('Unauthorization');
        e.statusCode = 401;
        return next(e);
    } else {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        req.user = { userId };
        next();
    }
};
