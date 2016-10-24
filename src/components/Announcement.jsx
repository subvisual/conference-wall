import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';

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

  get currentTalk() {
    return this.findTalk((talk) => {
      const talkStartTimestamp = moment(talk.start, "H:mm").unix();
      const talkEndTimestamp = moment(talk.end, "H:mm").unix();
      const startDifference = moment().unix() - talkStartTimestamp;
      const endDifference =talkEndTimestamp - moment().unix();

      console.log(startDifference);
      return (startDifference > 0 && endDifference   > 0) ||
             (startDifference < 0 && startDifference > -(5 * 60)) ||
             (endDifference   < 0 && endDifference   > -(5 * 60));
    });
  }

  get upcomingTalk() {
    return this.findTalk((talk) => {
      const talkStartTimestamp = moment(talk.start, "H:mm").unix();
      const difference = talkStartTimestamp - moment().unix();
      return difference > 0 && difference < (15 * 60);
    });
  }

  content = () => {
    console.log('current', this.upcomingTalk);
    if (this.currentTalk) {
      return <div className="Announcement-talk">
        <div className="Announcement-header">Now on stage</div>
        <Talk talk={this.currentTalk} />
      </div>;
    } else if (this.upcomingTalk) {
      return <div className="Announcement-talk">
        <div className="Announcement-header">Coming up next</div>
        <Talk talk={this.upcomingTalk} />
      </div>;
    } else if (this.props.tweet) {
      return <div className="Announcement-tweet">
        <div className="Announcement-header">Announcement</div>
        <Tweet modifier="announcement" tweet={this.props.tweet} />
      </div>;
    }
  }

  render() {
    return <div className="Announcement">
      <div className="Stitches blue top" />
      <div className="Stitches blue bottom" />
      <div className="Stitches blue left" />
      <div className="Stitches blue right" />

      {this.content()}
    </div>;
  }
}
