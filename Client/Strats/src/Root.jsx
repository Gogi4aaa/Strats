import React, { Component } from 'react';
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
                <img src={logo} className='logo' />
            </Header>
            <Outlet />
        </>
    )
}

export default RootLayout;
