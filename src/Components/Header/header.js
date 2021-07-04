import React,{useState} from 'react';
import image from '../../images/insta.png';
import '../Header/header.css';

function Header() {
    const [logo, setlogo] = useState(image);
    return (
        <div className="header__div">
            <nav className="header__nav">
                <div className="header__navimg">
                    <img src={logo} alt="logo"></img>
                </div>
            </nav>
          
        </div>
    );
}

export default Header;
