import React, { Component } from 'react';

import DefaultPage from './components/DefaultPage/DefaultPage';
import Weather from './components/Weather/Weather';

import './App.scss'

class App extends Component {
  render() {
    return (
      <DefaultPage id="main" icon={undefined} title="Welcome to Strats!">
        <Weather />
        <p>Styling is fun!</p>
      </DefaultPage>
    )
  }
}

export default App
