import './register.css'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        try{
            const res = await axios.post("/auth/register", {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");

        } catch(err) {
            setError(true);
            console.log(err);
        }
    };

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form action="" className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Enter your username..." 
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email..."
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password.."
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginBtn">
                <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span className="errorText">Something went wrong!</span>}
        </div>
    )
}