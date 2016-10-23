import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';

import './Talk.scss';

const Speakers = require('json!yaml!../data/speakers.yml');

export default class Talk extends Component {
  static propTypes = {
    talk: PropTypes.object
  }

  static defaultProps = {
    talk: null
  }

  get speaker() {
    if (!this.props.talk) {
      return;
    }

    return _.find(Speakers, { twitter: this.props.talk.speaker });
  }

  get data() {
    if (!this.speaker) {
      return;
    }

    return {
      title: this.speaker.title,
      imageUrl: `/images/speakers/${this.speaker.first_name.toLowerCase()}-${this.speaker.last_name.toLowerCase()}.jpg`,
      name: `${this.speaker.first_name} ${this.speaker.last_name}`,
      twitter: `@${this.speaker.twitter}`,
      start: this.props.talk.start,
      end: this.props.talk.end
    }
  }

  render() {
    return <div className="Talk">
      <div className="Flex row alignCenter">
        <img src={this.data.imageUrl} alt={this.data.name} className="Talk-speakerPhoto" />
        <div className="Flex column alignStart">
          <div className="Talk-title">{this.data.title}</div>
          <div className="Talk-info">
            <span className="Talk-speaker">{this.data.name}</span>
            <span className="Talk-twitter">{this.data.twitter}</span>
            <span className="Talk-time">{this.data.start} - {this.data.end}</span>
          </div>
        </div>
      </div>
    </div>;
  }
}
