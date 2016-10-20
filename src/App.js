import React, { Component } from 'react';

import './App.scss';
import './style/Stitches.scss';
import './style/Flex.scss';
import './style/utilities.scss';

import TwitterStreamContainer from './components/TwitterStream';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Stitches red top" />
        <div className="Stitches red bottom" />
        <div className="Stitches red left" />
        <div className="Stitches red right" />

        <TwitterStreamContainer />
      </div>
    );
  }
}

export default App;
