import './header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Welcome to</span>
                <span className="headerTitleLg">My Blog</span>
            </div>
            <img className="headerImg" src="/images/header.jpg" alt="" />
        </div>
    )
}