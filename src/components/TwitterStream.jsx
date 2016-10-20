import io from 'socket.io-client';
import React, { Component, PropTypes } from 'react';

import Tweet from './Tweet';

import _ from 'lodash';

export default class TwitterStream extends Component {
  static propTypes = {
    hashtags: PropTypes.array,
    children: PropTypes.node
  }

  static defaultProps = {
    hashtags: ['rubyconfpt']
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
      const socket = io.connect('rubyconfpt-wall-server.herokuapp.com:4000', { query: this.hashtags })
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
    this.setState({ tweets: _.take([tweet, ...this.state.tweets], 5) })
  };

  highlightedTweet = () => {
    return <Tweet modifier="large" tweet={_.head(this.state.tweets)} />;
  }

  olderTweets = () => {
    return _.tail(this.state.tweets).map(tweet =>
      <Tweet key={tweet.id} tweet={tweet} />
    );
  }

  render() {
    return <div className="TwitterStream">
      <div className="TwitterStream-highlight">
        {this.highlightedTweet()}
      </div>
      <div className="TwitterStream-older">
        {this.olderTweets()}
      </div>
    </div>;
  }
}
