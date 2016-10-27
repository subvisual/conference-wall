import io from 'socket.io-client';
import React, { Component, PropTypes } from 'react';

import './Wall.scss';

import Tweet from './Tweet';
import Announcement from './Announcement';

import _ from 'lodash';

const MAX_TWEETS = 10;
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

  get tweets() {
    return _.filter(this.state.tweets);
  }

  get announcements() {
    return _.filter(this.state.annoucements);
  }

  componentDidMount() {
    const socket = io.connect(this.props.twitterStreamServer)
    socket.on('initialTweets', tweets => _.map(tweets, this.onTweet));
    socket.on('initialAnnouncements', announcements => _.map(announcements, this.onAnnouncement));
    socket.on('tweet', this.onTweet);
    socket.on('announcement', this.onAnnouncement);
    this.tickFilters();
    this.tickTweetCounter();
    const filterIntervalId = setInterval(this.tickFilters, 1000);
    const tweetRotatorId = setInterval(this.tickTweetCounter, 7000);

    this.setState({ socket, filterIntervalId, tweetRotatorId });
  }

  tickTweetCounter = () => {
    this.setState({ tweetRotateCounter: (this.state.tweetRotateCounter + 1) % MAX_TWEETS });
  }

  tickFilters = () => {
    this.setState((prevState) => {
      const currentTimestamp = Date.now();

      const announcements = _.filter(prevState.announcements, (announcement) => {
        return announcement && currentTimestamp - announcement.timestamp < (60 * 1000);
      });

      const tweets = _.filter(prevState.tweets, (tweet) => {
        return tweet;
      });

      return { tweets, announcements };
    })
  }

  componentWillUnmount() {
    this.setState(() => {
      this.state.socket.destroy();
      clearInterval(this.state.tweetRotatorId);
      return { socket: null };
    });
  }

  onTweet = tweet => {
    const timestamp = Date.now();
    this.setState({
      tweets: _.take([
        { data: tweet, timestamp },
        ...this.tweets
      ], MAX_TWEETS)
    })
  };

  onAnnouncement = tweet => {
    const timestamp = Date.now();
    this.setState({
      announcements: _.take([
        { data: tweet, timestamp },
        ...this.announcements
      ], MAX_ANNOUNCEMENTS)
    });
  }

  currentTweet = () => {
    return this.tweets[this.state.tweetRotateCounter % this.tweets.length];
  }

  renderCurrentTweet = () => {
    if (this.currentTweet() && this.currentTweet().data) {
      return <Tweet modifier="large" tweet={this.currentTweet().data} />;
    }
  }

  sidebar = () => {
    return this.tweets.map(tweet =>
      <Tweet key={tweet.data.id} tweet={tweet.data} />
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
            {this.renderCurrentTweet()}
          </div>
        </div>
        <div className="Wall-sidebar">
          {this.sidebar()}
        </div>
      </div>
      <div className="Wall-announcements">
        <Announcement tweets={this.announcements} />
      </div>
    </div>;
  }
}
