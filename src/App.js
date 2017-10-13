import React, { Component } from 'react';

import './App.scss';
import './style/Flex.scss';

import Wall from './components/Wall';

let server;
if (process.env.NODE_ENV === "production") {
  server = 'mirrorconf-wall-server.herokuapp.com:80';
} else {
  server = 'localhost:4000';
}
  server = 'mirrorconf-wall-server.herokuapp.com:80';

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
