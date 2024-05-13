import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Links from '../ui/Links/Links.jsx';

import './Navbar.scss';

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);

    function clickHandler() {
      setShowMenu(!showMenu);
    }

    return (
        <>
            <i className={`fa-solid fa-bars nav-icon ${showMenu ? 'nav-icon-menu-hide' : 'nav-icon-menu-show'}`} onClick={clickHandler}></i>
            <i className={`fa-solid fa-x nav-icon ${showMenu ? 'nav-icon-close-show' : 'nav-icon-close-hide'}`} onClick={clickHandler}></i>
            <div className={`navbar-left ${showMenu ? 'navbar-left-show' : 'navbar-left-hide'}`}>
                <Links linksContainer='ul' linksContainerClass="nav-list" links={
                    <>
                        <li className="nav-list-item">
                            <NavLink
                                className={({isActive}) => isActive ? 'nav-list-link-active' : 'nav-list-link'}
                                to="/" alt="Home" onClick={clickHandler}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-list-item">
                            <NavLink
                                className={({isActive}) => isActive ? 'nav-list-link-active' : 'nav-list-link'}
                                to="/About" alt="About" onClick={clickHandler}
                            >
                                About
                            </NavLink>
                        </li>
                    </>
                } />
            </div>
        </>
    )
}