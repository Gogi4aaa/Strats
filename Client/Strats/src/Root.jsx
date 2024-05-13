import { NavLink, Outlet } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import logo from './assets/logo.png';

import './Root.scss'

function RootLayout() {
    return (
        <>
            <Header className='main-header'>
                <Navbar />
                <NavLink to="/" alt="Home">
                    <img src={logo} className='logo' />
                </NavLink>
            </Header>
            <Outlet />
        </>
    )
}

export default RootLayout;
