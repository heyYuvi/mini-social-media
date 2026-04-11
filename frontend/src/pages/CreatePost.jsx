import { useRef, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";


const CreatePost = () => {

    const navigate = useNavigate();
    const fileRef = useRef();

    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePost = async () => {
        if (!content.trim() && !image) {
            return alert("Post cannot be empty");
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("content", content);
            if(image){
                 formData.append("image", image);
            }

            const response = await api.post("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setContent("");
            setImage(null);
            navigate("/feed");
            fileRef.current.value = null;
        } catch (error) {
            console.error(error.response?.data?.message || "Create post error");
        }finally{
            setLoading(false);
        }
    }

        const handleClick = () =>{
            fileRef.current.click();
        }

    return (
        <div className="mt-10 min-h-screen">
         <div className="w-full max-w-150 m-auto flex flex-col p-6">
               <div className="mb-20">
                <h1 className=" text-2xl font-bold mb-2 -ml-4">Create Post</h1>
                <p className="text-gray-500 font-semi border-l border-blue-400 pl-2">Share your vision with gallery. Minimalist aesthics, maximum imapct.</p>
            </div>
            <div className="p-4 flex flex-col">
                <textarea type="text" value={content} placeholder="What's on your mind?" onChange={(e) => {setContent(e.target.value) }} className="w-full  h-40 p-2 text-xl font-semibold bg-green-200 focus:outline-none mb-6"></textarea>
                <input type="file" ref={fileRef} onChange={(e) => { setImage(e.target.files[0])}} className="w-full h-50 bg-blue-200 mb-4 hidden"></input>
                <div onClick={handleClick} className="w-full h-50 bg-blue-200 mb-4 flex flex-col items-center justify-center cursor-pointer">
                    <MdOutlineAddAPhoto  size="35" className="text-blue-800 mb-3"/>
                    <p className="text-gray-400 font-semibold">Upload low-res imagery</p>
                    {image && (
                        <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover"></img>
                    )}
                </div>
                <button onClick={handlePost} disabled={loading} className="self-end bg-blue-400 p-2 font-bold text-white rounded-md hover:bg-blue-500 cursor-pointer">{loading ? "Posting" : (<div className="flex items-center gap-2">Post To Gallery<IoSend /></div>)}</button>
            </div>
         </div>
        </div>
    )
}

export default CreatePost;