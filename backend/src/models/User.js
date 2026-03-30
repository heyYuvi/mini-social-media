import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
    },
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;