import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getAllPosts, createOnePost, updateOnePost, deleteOnePost } from '../controllers/PostController.js';

const Router = express.Router();

Router.route('/').get(getAllPosts).post(verifyToken, createOnePost);

Router.route('/:postId').put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost);

export { Router };
