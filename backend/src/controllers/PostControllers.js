import mongoose from "mongoose";
import Post from "../models/Post.js";
import postCheck from "../validations/PostValidation.js";

// Posting logic

export const addPost = async (req, res) =>{
    try{
    const result = postCheck.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            errors: result.error.issues
        });
    }

    const data = result.data

    const post = await Post.create({
        content: data.content,
        image: data.image ,
        author: req.user._id
    });

    await post.populate("author", "name email avatar");

    return res.status(201).json({
        success: true,
        message: "Post created",
        data:{
            id: post._id,
            content: post.content,
            image: post.image,
            author:{
                id: post.author._id,
                name: post.author.name,
                email: post.author.email,
                avatar: post.author.avatar
            },
            createdAt: post.createdAt
        }
    });
    }catch(error){
        console.error("Add post error", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const getPost = async (req, res) =>{
    try{
    const query = {};
    const page = Math.max(Number(req.query.page  || 1), 1);
    const limit = Math.min(Number(req.query.limit || 5), 10);
    const skip = (page -1) * limit;

    const { search } = req.query;

    if(search){
        query.content = {$regex: search, $options: "i"};
    }

    const posts = await Post.find(query).select("content image author likes createdAt").skip(skip).limit(limit).sort({ createdAt: -1}).populate("author", "name email avatar");
    return res.json({
        success: true,
        count: posts.length,
        data: posts.map(post =>({
            id: post._id,
            content: post.content,
            image: post.image,
            likes: post.likes.length,
            author: {
                id: post.author._id,
                name: post.author.name,
                email: post.author.email,
                avatar: post.author.avatar
            },
            createdAt: post.createdAt
        }))
    });
    }catch(error){
        console.error("Get post error", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const deletePost = async (req, res) =>{
    try{
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid post id"
            });
        }
        
    const post = await Post.findById(id).select("author");
    if(!post){
        return res.status(404).json({
            success: false,
            message: "Post not found"
        });
    }

    if(post.author.toString() !== req.user._id.toString()){
        return res.status(403).json({
            success: false,
            message: "Not allowed"
        });
    }

    await post.deleteOne();
    return res.json({
        success: true,
        message: "Post deleted",
        postID: id
    });
    }catch(error){
        console.error("Delete post error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}