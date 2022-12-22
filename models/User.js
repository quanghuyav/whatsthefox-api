import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema(
    {
        name: { type: String, unique: false, trim: true, required: [true, 'Name must be require'] },
        email: { type: String, unique: true, trim: true, required: [true, 'Email must be require'] },
        password: {
            type: String,
            trim: true,
            required: [true, 'Password must be require'],
            minLength: [6, 'Password must be at least 6 chars'],
        },
        avatar: { type: String },
    },
    { timestamps: true },
);

//khong duoc su dung arrow function
userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (e, hash) {
        if (e) return next(e);
        else {
            user.password = hash;
            next();
        }
    });
});

const User = mongoose.model('User', userSchema);

export { User };
