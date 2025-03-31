import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imageUrl: String,
    isPublic: {
        type: Boolean,
        default: true,
},
},
{
    timestamps: true,
},
);
PostSchema.set('validateBeforeSave', true);
//PostsSchema.set(validateBeforeSave);

export default mongoose.model('Post', PostSchema);