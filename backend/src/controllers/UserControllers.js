import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { loginSchema, registerSchema } from "../validations/UserValidations.js";
import mongoose from "mongoose";


//register
export const register = async (req, res) => {
    try {
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }

        const data = result.data;

        const existingEmail = await User.findOne({ email: data.email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User registered",
            data: {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            },
        });
    } catch (error) {
        console.error("Register error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

//Login

export const login = async (req, res) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error.issues
            });
        }

        const data = result.data;

        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            success: true,
            message: "Login successful",
            data: {
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error("Login error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// Follow Logic

export const toggleFollow = async (req, res) =>{
    try{
        
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid user id"
        });
    }

        const currentUser = req.user;

        if(id === currentUser._id.toString()){
            return res.status(400).json({
                success: false,
                message: "Cannot follow yourself"
            });
        }

    const targetUser = await User.findById(id).select("name avatar followers following");
    if(!targetUser){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const isFollowing = currentUser.following.some((userId) => userId.toString() === id );

    if(isFollowing){
        targetUser.followers.pull(currentUser._id);
        currentUser.following.pull(targetUser._id);
    }
    else{
        targetUser.followers.push(currentUser._id);
        currentUser.following.push(targetUser._id);
    }

    await currentUser.save();
    await targetUser.save();

    return res.json({
        success: true,
        message: isFollowing? "Unfollowed" : "Followed",
        data: {
            id: targetUser._id,
            name: targetUser.name,
            avatar: targetUser.avatar,
            followers: targetUser.followers.length,
        },
        isFollowing: !isFollowing,
        createdAt: targetUser.createdAt
    });

    }catch(error){
        console.error("Toggle follow error", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}