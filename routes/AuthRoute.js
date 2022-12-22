import express from 'express';
import { resigter, login, getCurrentUser } from '../controllers/AuthController.js';
import { CheckCurrentUser } from '../middleware/CheckCurrentUser.js';
const Router = express.Router();

Router.route('/resigter').post(resigter);
Router.route('/login').post(login);
Router.route('/').get(CheckCurrentUser, getCurrentUser);

export { Router };
