import { useNavigate } from "react-router-dom";

const Logout = () =>{

    const navigate = useNavigate();

    const handleLogout = () =>{

        const confirmLogout = window.confirm("Logout?");

        if(confirmLogout){
            localStorage.removeItem("token");
            navigate("/", {replace: true});
        }
    }

     return (
        <button onClick={handleLogout} className="border p-1 rounded-md font-semibold bg-gray-400 text-white hover:bg-gray-500 transition cursor-pointer mr-4">Logout</button>
     )
}

export default Logout;