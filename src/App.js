import React, { Component } from 'react';

import './App.scss';
import './style/Stitches.scss';
import './style/Flex.scss';
import './style/utilities.scss';

import Wall from './components/Wall';

let server;
if (process.env.NODE_ENV === "production") {
  server = 'rubyconfpt-wall-server.herokuapp.com:80';
} else {
  server = 'localhost:4000';
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wall
          twitterStreamServer={server}
        />
      </div>
    );
  }
}

export default App;
