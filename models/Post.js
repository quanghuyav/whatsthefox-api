import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        content: { type: String, trim: true, required: [true, 'Post must be require'] },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);
const Post = mongoose.model('Post', postSchema);
export { Post };
