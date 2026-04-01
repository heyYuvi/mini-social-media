import mongoose from "mongoose";
import commentCheck from "../validations/CommentValidation.js";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

//Add Comments
export const addComment = async (req, res) =>{
    try{
        
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid post id"
        });
    }

    const post = await Post.findById(id);
    if(!post){
        return res.status(404).json({
            success: false,
            message: "Post not found"
        });
    }

    const result = commentCheck.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success: false,
            error: result.error.issues
        });
    }

    const data = result.data;

    const comment = await Comment.create({
        text: data.text,
        author: req.user._id,
        post: id
    });

    await comment.populate("author", "name email avatar");

    return res.status(201).json({
        success: true,
        message: "Comment added",
        data: {
            id: comment._id,
            text: comment.text,
            author: {
                id: comment.author._id,
                name: comment.author.name,
                avatar: comment.author.avatar
            },
            post: {
                id: comment.post
            },
            createdAt: comment.createdAt
        }
    });
    }catch(error){
        console.error("Comment error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

//Get Comments

export const getComments = async (req, res) =>{
    try{
        const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid post id"
        });
    }

    const post = await Post.findById(id);
    if(!post){
        return res.status(404).json({
            success: false,
            message: "Post not found"
        });
    }

    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Number(req.query.limit || 5), 10);
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ post: id}).populate("author", "name email avatar").sort({ createdAt: -1}).skip(skip).limit(limit);

    return res.json({
        success: true,
        data: comments.map(comment => ({
            id: comment._id,
            text: comment.text,
            author: {
                id: comment.author._id,
                name: comment.author.name,
                email: comment.author.email,
                avatar: comment.author.avatar
            },
            post: {
                id: comment.post
            },
            createdAt: comment.createdAt
        }))
    });
    }catch(error){
        console.error("Get comments error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
