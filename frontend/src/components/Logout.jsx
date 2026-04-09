import { useNavigate } from "react-router-dom";

const Logout = () =>{

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/");
    }

     return (
        <button onClick={handleLogout} className="border p-1 rounded-md font-semibold bg-gray-400 text-white hover:bg-gray-500 transition cursor-pointer mr-4">Logout</button>
     )
}

export default Logout;