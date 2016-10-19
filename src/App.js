import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TwitterStreamContainer from './containers/TwitterStream';
import TweetsWall from './components/TweetsWall';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <TwitterStreamContainer>
          <TweetsWall/>
        </TwitterStreamContainer>
      </div>
    );
  }
}

export default App;
