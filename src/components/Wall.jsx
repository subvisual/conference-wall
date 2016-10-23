import io from 'socket.io-client';
import React, { Component, PropTypes } from 'react';

import './Wall.scss';

import Tweet from './Tweet';
import Announcement from './Announcement';

import _ from 'lodash';

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
      announcement: null,
      socket: null,
    };
  }

  componentDidMount() {
    this.setState(() => {
      const socket = io.connect(this.props.twitterStreamServer)
      socket.on('initialTweets', tweets => _.map(tweets, this.onTweet));
      socket.on('tweet', this.onTweet);
      socket.on('announcement', this.onAnnouncement);
      return { socket };
    });
  }

  componentWillUnmount() {
    this.setState(() => {
      this.state.socket.destroy();
      return { socket: null };
    });
  }

  onTweet = tweet => {
    this.setState({ tweets: _.take([tweet, ...this.state.tweets], 10) })
  };

  onAnnouncement = announcement => {
    this.setState({ announcement });
  }

  highlightedTweet = () => {
    return <Tweet modifier="large" tweet={_.head(this.state.tweets)} />;
  }

  olderTweets = () => {
    return _.tail(this.state.tweets).map(tweet =>
      <Tweet key={tweet.id} tweet={tweet} />
    );
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
            {this.highlightedTweet()}
          </div>
        </div>
        <div className="Wall-sidebar">
          {this.olderTweets()}
        </div>
      </div>
      <div className="Wall-announcements">
        <Announcement tweet={this.state.announcement} />
      </div>
    </div>;
  }
}
