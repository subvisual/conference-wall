import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTweet from 'react-tweet'

import './Tweet.scss';

export default class Tweet extends Component {
  static propTypes = {
    tweet: PropTypes.object,
    modifier: PropTypes.string,
  }

  static defaultProps = {
    tweet: null,
    modifier: ""
  }

  data = () => {
    const result = this.props.tweet;
    result.user.profile_image_url = result.user.profile_image_url.replace('_normal', '');
    return result;
  }

  render() {
    const classes = `Tweet ${this.props.modifier} u-relative`;

    if (this.props.tweet) {
      return <div className={classes}>
        <ReactTweet className={this.props.modifier} data={this.data()} />
      </div>
    } else {
      return <span />
    }
  }
}
