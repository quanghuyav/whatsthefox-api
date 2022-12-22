import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const resigter = async (req, res, next) => {
    try {
        const user = await User(req.body).save();
        const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);

        res.status(200).json({
            status: 'success',
            data: { token, userName: user.email, name: user.name, avatar: user.avatar },
        });
    } catch (e) {
        next(e);
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            const e = new Error('Email is not correct');
            e.statusCode = 400;
            return next(e);
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
            res.status(200).json({
                status: 'success',
                data: { token, userName: user.email, name: user.name, avatar: user.avatar },
            });
        } else {
            const e = new Error('Password is not correct');
            e.statusCode = 400;
            return next(e);
        }
    } catch (e) {
        res.json(e);
    }
};
export const getCurrentUser = async (req, res, next) => {
    try {
        const data = { user: null };
        if (req.user) {
            const user = await User.findOne({ _id: req.user.userId });
            data.user = { userName: user.email, name: user.name, avatar: user.avatar };
        }

        res.status(200).json({
            status: 'success',
            data: data,
        });
    } catch (e) {
        console.log(e);
        res.json(e);
    }
};
