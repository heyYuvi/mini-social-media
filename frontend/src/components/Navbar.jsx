import { Link } from "react-router-dom";

const Navbar = () =>{

    return (
        <div className="flex justify-between mt-4 items-center">
            <div className="ml-4">
                <h1 className="text-2xl font-bold cursor-pointer">Lucid</h1>
            </div>
            <div className="flex gap-3 text-gray-600">
                <Link to="/feed" className="hover:border-b-2 border-blue-600 hover:text-blue-600 transition">Feed</Link>
                <p className="hover:border-b-2 border-blue-600 hover:text-blue-600 transition">Profile</p>
            </div>
            <div>
                <p>Logout</p> 
            </div>
        </div>
    )
}

export default Navbar;