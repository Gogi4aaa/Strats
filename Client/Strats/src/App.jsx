import React, { Component } from 'react';
import Weather from './components/Weather/Weather';

import './App.scss'

class App extends Component {
  render() {
    return (
      <div id="main">
        <h2>Welcome to Strats!</h2>
        <Weather />
      </div>
    )
  }
}

export default App
