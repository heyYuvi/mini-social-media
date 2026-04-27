import { useRef, useState } from "react";
import { api } from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

const Test = () =>{
    const fileRef = useRef();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const handlePost = async() =>{

        if(!content.trim()  && !image){
            return alert("Post cannot be empty");
        }

        const formData = new FormData;
        formData.append("content", content);
        formData.append("image", image);

        const response = await api.post("/posts", formData);

        setContent("");
        setImage(null);
        navigate("/feed");
    }

    return (
        <div>
            <textarea value={content} onChange={(e) =>{setContent(e.target.value)}} placeholder="Write here whats on yourt mind"></textarea>
            <input type="file" ref={fileRef} onChange={(e) =>{setImage(e.target.files[0])}}></input>
            <button onClick={handlePost}>Post</button>
        </div>
    )
}

export default Test;