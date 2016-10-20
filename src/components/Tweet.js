import React, { Component, PropTypes } from 'react';
import ReactTweet from 'react-tweet'
import './TwitterStream.scss';
import './Tweet.scss';
import '../style/Flex.scss';

export default class Tweet extends Component {
  static propTypes = {
    tweet: PropTypes.object,
    modifier: PropTypes.string,
  }

  static defaultProps = {
    tweet: null,
    modifier: ""
  }

  render() {
    const classes = `Tweet ${this.props.modifier} u-relative`;

    if (this.props.tweet) {
      return <div className={classes}>
        <ReactTweet className={this.props.modifier} data={this.props.tweet} />;
      </div>;
    } else {
      return <span />;
    }
  }
}
