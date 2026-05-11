import { useState } from "react";
import { api } from "../services/api";

const LikeButton = ({likes: initialLike, postId, isLiked: initialIsLiked}) =>{
    const [like, setLike] = useState(initialLike);
    const [isLiked, setIsLiked] = useState(initialIsLiked);


    const handleLike = async () =>{
        const response = await api.put(`/posts/like/${postId}`);
        setLike(response.data.likes);
        setIsLiked(response.data.isLiked);
    }

    return (
        <div>
            <p className="font-semibold text-blue-500 cursor-pointer" onClick={handleLike}>{isLiked? "❤️" :  "🤍"} {like} Likes</p>
        </div>
    )
}

export default LikeButton;