import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    
    subscriptions: {
        type: Object,
    },

    subscribers: {
        type: Object,
    }
    },
    
    {
        timestamps: true,
    },
);
export default mongoose.model('User', UserSchema);