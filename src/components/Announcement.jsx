import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './Announcement.scss';

import { getCurrentTalk, getUpcomingTalk } from '../models/schedule'
import Tweet from './Tweet';
import Talk from './Talk';

export default class Announcement extends Component {
  static propTypes = {
    tweets: PropTypes.array
  }

  static defaultProps = {
    tweets: [] }

  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount = () => {
    this.atInterval();
    this.setState({
      intervalId: setInterval(this.atInterval, 8000)
    });
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  atInterval = () => {
    this.setState({
      currentTalk: getCurrentTalk(),
      upcomingTalk: getUpcomingTalk(),
      counter: (this.state.counter + 1) % 3,
    });
  }

  renderCurrentTalk = () => {
    if (!this.state.currentTalk) return

    return <div className="Announcement-talk">
      <div key="currentTalk" className="Announcement-header">Now on stage</div>
      <Talk {...this.state.currentTalk} />
    </div>;
  }

  renderUpcomingTalk = () => {
    if (this.state.upcomingTalk && _.get(this.state.upcomingTalk, 'speaker') !== _.get(this.state.currentTalk, 'speaker')) {
      return <div key="upcomingTalk" className="Announcement-talk">
        <div className="Announcement-header">Coming up next</div>
        <Talk talk={this.state.upcomingTalk} />
      </div>;
    }
  }

  renderTweet = (announcement) => {
    if (announcement) {
      return <div key="tweet" className="Announcement-tweet">
        <Tweet modifier="announcement" tweet={announcement.tweet} />
      </div>;
    }
  }

  content = () => {
    const array = _.filter([
      this.renderCurrentTalk(),
      this.renderUpcomingTalk(),
    ].concat(
      _.map(this.props.tweets, this.renderTweet)
    ))
    return array[this.state.counter % array.length];
  }

  render() {
    return <div className="Announcement">
      <CSSTransitionGroup transitionName="Announcement-transition" transitionEnterTimeout={1500} transitionLeaveTimeout={750}>
        {this.content()}
      </CSSTransitionGroup>
    </div>;
  }
}
