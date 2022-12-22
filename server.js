// khai báo env
import * as dotenv from 'dotenv';
dotenv.config();

//connect DB
import { connectDB } from './configs/db.js';
connectDB();

//main
import express from 'express';
import cors from 'cors';

import { Router as authRoute } from './routes/AuthRoute.js';
import { Router as postRoute } from './routes/PostRoute.js';
import { ErrorHandler } from './middleware/ErrorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);

app.all('*', (req, res, next) => {
    const e = new Error('The route can not be found');
    e.statusCode = 404;
    next(e);
});
app.use(ErrorHandler);

const port = process.env.APP_PORT || 3000;
const server = app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

// KẾT NỐI SOCKET
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Post } from './models/Post.js';

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (client) => {
    console.log('kết nối người dùng mới');
    client.on('sendDataClient', async (data) => {
        try {
            const Authorization = data.token;
            const token = Authorization.replace('Bearer ', '');
            const { userId } = jwt.verify(token, process.env.APP_SECRET);
            const post = await Post({ content: data.content, author: userId }).save();
            const postt = await Post.findById(post._id)
                .populate('author', 'email name avatar')
                .select('content createdAt');

            io.emit('sendDataServer', postt);
        } catch (e) {
            console.log(e);
        }
    });
});
