import './login.css'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import { Context } from "../../context/Context"

export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});

        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({type:"LOGIN_SUCCESS", payload:res.data});
            // res.data && window.location.replace("/");

        } catch(err) {
            dispatch({type:"LOGIN_FAILURE"});
        }
    };

    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    type="text" 
                    placeholder="Enter your username..."
                    ref={userRef}
                />
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password..."
                    ref={passwordRef}
                />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterBtn">
                <Link className="link" to="/register">Register</Link>
            </button>
        </div>
    )
}