import jwt from 'jsonwebtoken';

export const CheckCurrentUser = (req, res, next) => {
    const Authorization = req.header('Authorization');
    if (!Authorization) {
        req.user = null;
        next(e);
    } else {
        const token = Authorization.replace('Bearer ', '');

        try {
            const { userId } = jwt.verify(token, process.env.APP_SECRET);
            req.user = { userId };
            next();
        } catch {
            req.user = null;
            next();
        }
    }
};
