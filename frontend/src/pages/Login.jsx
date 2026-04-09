import { useState } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            if(!form.email || !form.password){
                alert("All fields are required");
                return
            }

            const response = await api.post("/user/login", form);
            
            localStorage.setItem("token", response.data.token);


        alert("Login Successfull");

        setForm({
            email: "",
            password: ""
        });

        navigate("/feed");

        }catch(error){
            console.error(error.response?.data.message || "Login Failed");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 shadow-lg rounded-xl bg-white p-6">
                <h1 className="text-center mb-6 text-2xl font-bold">Login</h1>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" required></input>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400" required></input>
                <button type="submit" className="w-full border bg-blue-400 p-3 rounded-lg font-bold text-white cursor-pointer hover:bg-blue-500 transition mb-4">Login</button>
                <p className="text-gray-400 text-center">Don't have an account?<Link to="/register" className="font-semibold hover:underline ml-1 text-blue-500">Register</Link></p>
            </form>
        </div>
    )
}

export default Login;