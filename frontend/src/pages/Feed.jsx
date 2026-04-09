import { useEffect, useState } from "react";
import { api } from "../services/api";

const Feed = () =>{
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFeed = async () =>{
        try{
            const response = await api.get("/feed");
        setFeed(response.data.data);
        }catch(error){
            console.error(error.response?.data.message || "Feed Error");
        }
    }

    useEffect(() =>{
        getFeed();
        setLoading(false);
    }, []);

    return (
        <div className="flex justify-center bg-gray-100 h-screen pt-10">
            { loading? (<div>...loading</div>) : (
                <div>
                    {feed.map((post) => (
                        <div key={post.id} className="rounded-md  bg-white mb-20 w-96 p-6">
                            <div className="flex items-center mb-4">
                                <img src={post.author.avatar} className="rounded-full w-10 h-10"></img>
                                <p className="ml-2 font-bold">{post.author.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 italic mb-5">{post.content}</p>
                                <p className="font-semibold text-blue-500">💙{post.likes} Likes</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Feed;