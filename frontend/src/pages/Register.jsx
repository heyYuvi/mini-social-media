import { useState } from "react";
import { api } from "../services/api";

const Register  = () =>{
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

        const response = await api.post("user/register", form);
        alert("User Registered");

        setForm({
            name: "",
            email: "",
            password: ""
        });
    }

    return (
        <div className="flex justify-center min-h-screen items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 bg-white rounded-lg shadow-lg p-6">
                <h1 className="font-bold text-2xl text-center mb-4">Register</h1>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-3 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"></input>
                <button type="submit"  className="w-full border font-bold bg-blue-400 p-3 rounded-md text-white cursor-pointer hover:bg-blue-500 transition">Register</button>
            </form>
        </div>
    )
} 

export default Register;