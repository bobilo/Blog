import { useContext } from 'react';

import './topbar.css'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function TopBar() {

  const { user, dispatch } = useContext(Context);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/login");
  };
  
    return (
        <div className="top">
           <div className="topLeft">
           <i className="topIcon fab fa-facebook-square"></i>
           <i className="topIcon fab fa-twitter-square"></i>
           <i className="topIcon fab fa-instagram-square"></i>
           </div>
           <div className="topCenter">
               <ul className="topList">
                  <li className="topListItem">
                      <Link className="link" to="/">HOME</Link>
                  </li>
                  <li className="topListItem">
                    <Link className="link" to="/about">ABOUT</Link>
                  </li>
                  <li className="topListItem">
                    <Link className="link" to="/contact">CONTACT</Link>
                  </li>
                  {
                    user && 
                    <li className="topListItem">
                      <Link className="link" to="/write">WRITE</Link>
                    </li>
                  }
                  <li className="topListItem" onClick={handleLogout}>
                    {user && "LOGOUT"}
                  </li> 
               </ul>
           </div>
           <div className="topRight">
               { user ? (
                 <Link className="link" to="/settings">
                   <img className="topImg"
                      src={PF + user.profilePic} 
                      alt="" 
                   />
                  </Link>
               ) : (
                   <ul className="topList">
                       <li className="topListItem">
                        <Link className="link" to="/login">LOGIN</Link>
                       </li>
                       <li className="topListItem">
                        <Link className="link" to="/register">REGISTER</Link>
                       </li>
                   </ul>
               )}
               
               <i className="searchIcon fas fa-search"></i>
           </div>
        </div>
    )
}