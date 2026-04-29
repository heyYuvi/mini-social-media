import mongoose from "mongoose";
import Post from "../models/Post.js";
import postCheck from "../validations/PostValidation.js";
import cloudinary from "../config/cloudinary.js";

// Posting logic

export const addPost = async (req, res) => {
    try {

        let imageUrl = "";
        if(req.file){
            const result = await new Promise((resolve, reject) =>{
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "posts"},
                    (error, result)=>{
                        if(error) return reject(error);
                        resolve(result);
                    });

                    stream.end(req.file.buffer);
            });

            imageUrl = result.secure_url
        }


        const result = postCheck.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.issues
            });
        }

        const data = result.data

        const post = await Post.create({
            content: data.content,
            image: imageUrl,
            author: req.user._id
        });

        await post.populate("author", "name email avatar");

        return res.status(201).json({
            success: true,
            message: "Post created",
            data: {
                id: post._id,
                content: post.content,
                image: post.image,
                author: {
                    id: post.author._id,
                    name: post.author.name,
                    email: post.author.email,
                    avatar: post.author.avatar
                },
                createdAt: post.createdAt
            }
        });
    } catch (error) {
        console.error("Add post error", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const getPost = async (req, res) => {
    try {
        const query = {};
        const page = Math.max(Number(req.query.page || 1), 1);
        const limit = Math.min(Number(req.query.limit || 5), 10);
        const skip = (page - 1) * limit;

        const { search } = req.query;

        if (search) {
            query.content = { $regex: search, $options: "i" };
        }

        const posts = await Post.find(query).select("content image author likes createdAt").skip(skip).limit(limit).sort({ createdAt: -1 }).populate("author", "name email avatar");

        const total = await Post.countDocuments();

        return res.json({
            success: true,
            count: posts.length,
            page,
            limit,
            total,
            data: posts.map(post => ({
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
    } catch (error) {
        console.error("Get post error", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post id"
            });
        }

        const post = await Post.findById(id).select("author");
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
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
    } catch (error) {
        console.error("Delete post error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

//Like and Unlike logic

export const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid post id"
            });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        const isLiked = post.likes.some((userID) => userID.toString() === req.user._id.toString());
        if (isLiked) {
            post.likes.pull(req.user._id)
        }
        else {
            post.likes.push(req.user._id)
        }

        await post.save();

        return res.json({
            success: true,
            likes: post.likes.length,
            isLiked: !isLiked
        });
    } catch (error) {
        console.error("Toggle like error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Personalized feed

export const getFeed = async (req, res) =>{
    try{
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Number(req.query.limit || 5), 10);
    const skip = (page - 1) * limit;

    const authors = [...req.user.following, req.user._id]

    const posts = await Post.find({ author: { $in: authors } }).sort({ createdAt: -1}).populate("author", "name avatar").skip(skip).limit(limit).lean();
    if(posts.length === 0){
        return res.json({
            success: true,
            count: 0,
            total: 0,
            page,
            limit,
            hasMore: false,
            data: []
        });
    }
    
    const total = await Post.countDocuments({ author: { $in: authors }});

    return res.json({
        success: true,
        count: posts.length,
        total: total,
        page: page,
        limit: limit,
        hasMore: skip + posts.length <  total,
        data: posts.map((post) =>({
            id: post._id,
            content: post.content,
            image: post.image,
            likes: post.likes.length,
            author: {
                id: post.author._id,
                name: post.author.name,
                avatar: post.author.avatar
            },
            createdAt: post.createdAt
        }))
    });
    }catch(error){
        console.error("Feed error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

