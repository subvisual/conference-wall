import io from 'socket.io-client';
import React, { Component, PropTypes } from 'react';

import './Wall.scss';

import Tweet from './Tweet';

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
      socket: null,
    };
  }

  componentDidMount() {
    this.setState(() => {
      const socket = io.connect(this.props.twitterStreamServer, { query: this.hashtags })
      socket.on('initialTweets', tweets => _.map(tweets, this.onTweet));
      socket.on('tweet', this.onTweet);
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

  highlightedTweet = () => {
    return <Tweet modifier="large" tweet={_.head(this.state.tweets)} />;
  }

  olderTweets = () => {
    return _.tail(this.state.tweets).map(tweet =>
      <Tweet key={tweet.id} tweet={tweet} />
    );
  }

  announcement = () => {

  }

  render() {
    return <div className="Wall">
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
      {this.announcement()}
    </div>;
  }
}
