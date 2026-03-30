import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    content:{
        type: String,
        trim: true,
        required: true,
        maxlength: 3000
    },
    image:{
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},{ timestamps: true });

postSchema.index({ createdAt: -1});

const Post = mongoose.model("Post", postSchema);

export default Post;