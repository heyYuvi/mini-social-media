import { useState } from "react";
import { api } from "../services/api";

const LikeButton = ({likes: initialLike, postId, isLiked: initialIsLiked}) =>{
    const [like, setLike] = useState(initialLike);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [loading, setLoading] = useState(false);


    const handleLike = async () =>{
        setLoading(true);
        const response = await api.put(`/posts/like/${postId}`);
        setLike(response.data.likes);
        setIsLiked(response.data.isLiked);
        setLoading(false);
        
    }

    return (
        <>
        {loading? <div className="animate-spin w-5 h-5 border-blue-500 border-2 rounded-full border-t-transparent"></div> : 
        <div>
            <p className="font-semibold text-blue-500 cursor-pointer" onClick={handleLike}>{isLiked? "❤️" :  "🤍"} {like} Likes</p>
        </div>
        }        
        </>
    )
}

export default LikeButton;