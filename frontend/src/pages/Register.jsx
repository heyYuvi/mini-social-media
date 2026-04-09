import { useState } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Register  = () =>{

    const navigate = useNavigate()
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) =>{

        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!form.name || !form.password || !form.email){
            alert("All the fields are required");
        }
        try{
            const response = await api.post("user/register", form);
        alert("User Registered");

        setForm({
            name: "",
            email: "",
            password: ""
        });

        navigate("/");

        }catch(error){
            console.error(error.response?.data.message || "Register Error");
        }
    }

    return (
        <div className="flex justify-center min-h-screen items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 bg-white rounded-lg shadow-lg p-6">
                <h1 className="font-bold text-2xl text-center mb-6">Register</h1>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" required></input>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" required></input>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6" required></input>
                <button type="submit"  className="w-full border font-bold bg-blue-400 p-3 rounded-md text-white cursor-pointer hover:bg-blue-500 transition mb-4">Register</button>
                <p className="text-center text-gray-400">Already have an account?<Link to="/" className="hover:underline ml-1 text-blue-500 font-semibold">Login</Link></p>
            </form>
        </div>
    )
} 

export default Register;