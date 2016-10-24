import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import './Announcement.scss';

import Tweet from './Tweet';
import Talk from './Talk';

const Schedule = require('json!yaml!../data/schedule.yml');

export default class Announcement extends Component {
  static propTypes = {
    tweet: PropTypes.object
  }

  static defaultProps = {
    tweet: null
  }

  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount = () => {
    this.atInterval();
    this.setState({
      intervalId: setInterval(this.atInterval, 10000)
    });
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  atInterval = () => {
    console.log('rotating');
    this.setState({
      currentTalk: this.getCurrentTalk(),
      upcomingTalk: this.getUpcomingTalk(),
      counter: (this.state.counter + 1) % 3,
    });
  }

  get today() {
    return _.find(Schedule, {
      date: moment().format('dddd, MMMM Do')
    });
  }

  findTalk = (tester) => {
    if (!this.today) {
      return;
    }

    return _.find(this.today.events, (event) => {
      if (event.name === "talk" && tester(event)) {
        return event;
      }
    });
  }

  getCurrentTalk() {
    return this.findTalk((talk) => {
      const talkStartTimestamp = moment(talk.start, "H:mm").unix();
      const talkEndTimestamp = moment(talk.end, "H:mm").unix();
      const startDifference = moment().unix() - talkStartTimestamp;
      const endDifference =talkEndTimestamp - moment().unix();

      return (startDifference > 0 && endDifference   > 0) ||
             (startDifference < 0 && startDifference > -(1 * 60)) ||
             (endDifference   < 0 && endDifference   > -(1 * 60));
    });
  }

  getUpcomingTalk = () => {
    return this.findTalk((talk) => {
      const talkStartTimestamp = moment(talk.start, "H:mm").unix();
      const difference = talkStartTimestamp - moment().unix();
      return difference > 0 && difference < (15 * 60);
    });
  }

  renderCurrentTalk = () => {
    if (this.state.currentTalk) {
      return <div className="Announcement-talk">
        <div key="currentTalk" className="Announcement-header">Now on stage</div>
        <Talk talk={this.state.currentTalk} />
      </div>;
    }
  }

  renderUpcomingTalk = () => {
    if (this.state.upcomingTalk && this.state.upcomingTalk.speaker != this.state.currentTalk.speaker) {
      return <div key="upcomingTalk" className="Announcement-talk">
        <div className="Announcement-header">Coming up next</div>
        <Talk talk={this.state.upcomingTalk} />
      </div>;
    }
  }

  renderTweet = () => {
    if (this.props.tweet) {
      return <div key="tweet" className="Announcement-tweet">
        <Tweet modifier="announcement" tweet={this.props.tweet} />
      </div>;
    }
  }

  content = () => {
    const array = _.filter([
      this.renderCurrentTalk(),
      this.renderUpcomingTalk(),
      this.renderTweet(),
    ])
    console.log(array.length, this.state.counter);
    return array[this.state.counter] || array[0];
  }

  render() {
    return <div className="Announcement">
      <div className="Stitches blue top" />
      <div className="Stitches blue bottom" />
      <div className="Stitches blue left" />
      <div className="Stitches blue right" />

      <CSSTransitionGroup transitionName="Announcement-transition" transitionEnterTimeout={1500} transitionLeaveTimeout={750}>
        {this.content()}
      </CSSTransitionGroup>
    </div>;
  }
}
