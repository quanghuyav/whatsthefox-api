import { Post } from '../models/Post.js';

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('author', 'email name avatar')
            .select('content createdAt');
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: { posts },
        });
    } catch (e) {
        res.json(e);
    }
};

export const createOnePost = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const post = await Post({ ...req.body, author: userId }).save();
        res.status(200).json({
            status: 'success',
            data: { post },
        });
    } catch (e) {
        res.json(e);
    }
};

export const updateOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByIdAndUpdate(postId, { ...req.body }, { new: true, runValidator: true });
        res.status(200).json({
            status: 'success',
            data: { post },
        });
    } catch (e) {
        next(e);
    }
};

export const deleteOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            status: 'success',
            mess: 'post has been deleted',
        });
    } catch (e) {
        next(e);
    }
};
