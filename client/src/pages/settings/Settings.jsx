import axios from 'axios'
import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'

export default function Settings() {
    const { user, dispatch } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        setSuccess(false);
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            
            try {
                await axios.post("https://node-blog-backend-bonface.herokuapp.com/api/upload", data);
            } catch(err) {
                console.log(err);
            }
        }

        try {
            const res = await axios.put("https://node-blog-backend-bonface.herokuapp.com/api/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS", payload: res.data});
            window.location.reload();

        } catch(err) {
            console.log(err);
            dispatch({type: "UPDATE_FAILURE"});
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete("https://node-blog-backend-bonface.herokuapp.com/api/users/" + user._id, {
                data: {userId: user._id}
            });
            dispatch({ type: "LOGOUT" });
            window.location.replace("/register");

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle" onClick={handleDeleteUser}>Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img 
                            src={ file ? URL.createObjectURL(file) : PF + user.profilePic} 
                            alt="" 
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{display: "none"}}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="settingsButton" type="submit">
                        Update
                    </button>
                    {success && 
                        <span style={{color: "green", textAlign: "center", marginTop: "10px"}}>Profile updated successfully</span>
                    }
                </form>
            </div>
            <Sidebar />
        </div>
    )
}