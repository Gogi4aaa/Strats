import React, { Component } from 'react';

import Header from './components/Header/Header';
import DefaultPage from './components/DefaultPage/DefaultPage';
import Weather from './components/Weather/Weather';
import logo from './assets/logo.png';

import './App.scss'

class App extends Component {
  render() {
    return (
      <>
        <Header className='main-header'><img src={logo} className='logo' /></Header>
        <DefaultPage id="weather">
          <Weather />
        </DefaultPage>
      </>
    )
  }
}

export default App
