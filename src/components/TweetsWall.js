import React, { Component, PropTypes } from 'react';
import Tweet from 'react-tweet'

export default class TweetsWall extends Component {
  static propTypes = {
    tweets: PropTypes.array.isRequired
  }

  static defaultProps = {
    tweets: []
  }

  get tweets() {
    return this.props.tweets.map(tweet => {
      return <Tweet key={tweet.id} className="TweetsWall-tweet" data={tweet}/>;
    });
  }

  render() {
    return <div className="TweetsWall">
      {this.tweets}
    </div>;
  }
}
