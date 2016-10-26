import io from 'socket.io-client';
import React, { Component, PropTypes } from 'react';

import './Wall.scss';

import Tweet from './Tweet';
import Announcement from './Announcement';

import _ from 'lodash';

const MAX_TWEETS = 5;
const MAX_ANNOUNCEMENTS = 3;

export default class Wall extends Component {
  static propTypes = {
    children: PropTypes.node,
    server: PropTypes.string,
  }

  static defaultProps = {
    twitterStreamServer: 'localhost:4000',
  }

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      announcements: [],
      tweetRotateCounter: 0,
      socket: null,
    };
  }

  componentDidMount() {
    this.setState(() => {
      const socket = io.connect(this.props.twitterStreamServer)
      socket.on('initialTweets', tweets => _.map(tweets, this.onTweet));
      socket.on('tweet', this.onTweet);
      socket.on('announcement', this.onAnnouncement);
      const intervalId = setInterval(this.tick, 1000);
      return { socket, intervalId };
    });
  }

  tick = () => {
    this.setState(() => {
      const currentTimestamp = Date.now();

      return {
        announcements: _.filter(this.state.announcements, (announcement) => {
          return currentTimestamp - announcement.timestamp < (60 * 1000);
        }),
        tweets: _.filter(this.state.tweets, (tweet) => {
          return currentTimestamp - tweet.timestamp < (60 * 1000);
        }),
        tweetRotateCounter: (this.state.tweetRotateCounter + 1) % MAX_TWEETS,
      };
    })
  }

  componentWillUnmount() {
    this.setState(() => {
      this.state.socket.destroy();
      clearInterval(this.state.intervalId);
      return { socket: null };
    });
  }

  onTweet = tweet => {
    const timestamp = Date.now();
    this.setState({
      tweets: _.take([
        { tweet, timestamp },
        , ...this.state.tweets
      ], MAX_TWEETS)
    })
  };

  onAnnouncement = tweet => {
    const timestamp = Date.now();
    this.setState({
      announcements: _.take([
        { tweet, timestamp },
        ...this.state.announcements
      ], MAX_ANNOUNCEMENTS)
    });
  }

  currentTweet = () => {
    const currentTweet = this.state.tweets[this.state.tweetRotateCounter % this.state.tweets.length];

    return <Tweet modifier="large" tweet={currentTweet} />;
  }

  render() {
    return <div className="Wall">
      <div className="Wall-twitter">
        <div className="Stitches red top" />
        <div className="Stitches red left" />
        <div className="Stitches red right" />

        <div className="Wall-main">
          <div className="Wall-logo">
            <img src="/images/logo.png" alt="RubyConf PT logo" />
          </div>
          <div className="Wall-highlight">
            {this.currentTweet()}
          </div>
        </div>
      </div>
      <div className="Wall-announcements">
        <Announcement tweets={this.state.announcements} />
      </div>
    </div>;
  }
}
