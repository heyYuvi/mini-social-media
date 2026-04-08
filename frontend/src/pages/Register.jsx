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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange}></input>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}></input>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}></input>
                <button type="submit">Register</button>
            </form>
        </div>
    )
} 

export default Register;