import { NavLink, Outlet } from 'react-router-dom';

import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import logo from './assets/logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <ToastContainer stacked position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition: Slide/>
            <Outlet />
        </>
    )
}

export default RootLayout;
