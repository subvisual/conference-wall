import io from 'socket.io-client';
import React, { Component, PropTypes } from 'react';

import './Announcement.scss';

import Tweet from './Tweet';

export default class Announcement extends Component {
  static propTypes = {
    tweet: PropTypes.object
  }

  static defaultProps = {
    tweet: null
  }

  hasUpcomingTalk() {
    return true;
  }

  content = () => {
    if (this.hasUpcomingTalk()) {
      return <div className="Announcement-talk">
        TALK COMING UP
      </div>;
    } else if (this.props.tweet) {
      return <div className="Announcement-tweet">
        <Tweet modifier="announcement" tweet={this.props.tweet} />
      </div>;
    }
  }

  render() {
    return <div className="Announcement">
      {this.content()}
    </div>;
  }
}
