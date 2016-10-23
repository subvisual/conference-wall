import io from 'socket.io-client';
import React, { Component, PropTypes } from 'react';

import './Wall.scss';

import Tweet from './Tweet';
import Announcement from './Announcement';

import _ from 'lodash';

export default class Wall extends Component {
  static propTypes = {
    hashtags: PropTypes.array,
    children: PropTypes.node,
    server: PropTypes.string,
  }

  static defaultProps = {
    hashtags: ['rubyconfpt'],
    twitterStreamServer: 'localhost:4000',
  }

  constructor(props) {
    super(props);
    this.state = {
      hashtags: props.hashtags,
      tweets: [],
      announcement: null,
      socket: null,
    };
  }

  componentDidMount() {
    this.setState(() => {
      const socket = io.connect(this.props.twitterStreamServer, { query: this.hashtags })
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.hashtags)
      this.setState({ hashtags: nextProps.hashtags });
  }

  onTweet = tweet => {
    this.setState({ tweets: _.take([tweet, ...this.state.tweets], 10) })
  };

  onAnnouncement = announcement => {
    console.log("ANNOUNCEMENT");
    console.log(announcement);
    this.setState({ announcement });
  }

  highlightedTweet = () => {
    return "asd";
    return <Tweet modifier="large" tweet={_.head(this.state.tweets)} />;
  }

  olderTweets = () => {
    return "asd";
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
