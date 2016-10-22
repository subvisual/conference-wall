import io from 'socket.io-client';
import React, { Component, PropTypes } from 'react';

export default class Announcement extends Component {
  static propTypes = {
    tweet: PropTypes.object
  }

  static defaultProps = {
    tweet: null
  }

  render() {
    return <div className="Announcement">
    </div>;
  }
}
