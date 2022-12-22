import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewURLParser: true,
        });

        console.log('DB success');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
