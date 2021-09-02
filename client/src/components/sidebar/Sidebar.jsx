import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './sidebar.css'

export default function Sidebar() {
    const [cats, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("https://node-blog-backend-bonface.herokuapp.com/api/categories");
            setCategories(res.data);
        }
        fetchCategories();
    },[])
    
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="/images/bonnie.jpg" alt="" width="200px" />
                <p>Description about me</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((cat) => (
                        <Link className="link" to={`/?cat=${cat.name}`}>
                            <li className="sidebarListItem">{cat.name}</li>
                        </Link>
                        
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}