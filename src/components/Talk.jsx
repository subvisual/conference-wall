import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Talk.scss';

import Speakers from '../data/speakers.yml';

export default class Talk extends Component {
  static propTypes = {
    talk: PropTypes.object
  }

  static defaultProps = {
    talk: null
  }

  parameterize(string) {
    return string.toLowerCase().replace(/\s+/g, '-')
  }

  getSpeaker(handle) {
    return _.find(Speakers, { twitter: handle });
  }

  getRailsGirlsData() {
    if (this.props.talk.speaker !== "girls") {
      return;
    }

    const speakers = _.map([
        'lila_luca',
        'theatanzt',
        'Nada_Ashraf96',
        'MayarAlaa122'
      ], this.getSpeaker).map((speaker) => {
        speaker.imageUrl = `/images/speakers/${speaker.first_name.toLowerCase()}-${speaker.last_name.toLowerCase()}.jpg`;
        return speaker;
      });

    return {
      speakers: speakers,
      start: this.props.talk.start,
      end: this.props.talk.end,
      title: "Rails Girls Summer of Code: Falling into Rabbit Holes"
    }
  }

  getTalkData(talk) {
    const speaker = this.getSpeaker(talk.speaker);

    if (!speaker) return;

    const name = this.parameterize(`${speaker.first_name} ${speaker.last_name}`);

    return {
      title: speaker.talk,
      imageUrl: `/images/speakers/${name}.jpg`,
      name: `${speaker.first_name} ${speaker.last_name}`,
      twitter: `@${speaker.twitter}`,
      start: talk.start,
      end: talk.end
    }
  }

  renderRegularTalk = () => {
    const data = this.getTalkData(this.props.talk);
    const photoStyle = { backgroundImage: `url('${data.imageUrl}')` };

    return <div className="Talk">
      <div className="Flex row alignCenter">
        <div style={photoStyle} title={data.name} className="Talk-speakerPhoto" />
        <div className="Flex column alignStart">
          <div className="Talk-title">{data.title}</div>
          <div className="Talk-info">
            <span className="Talk-speaker">{data.name}</span>
            <span className="Talk-twitter">{data.twitter}</span>
            <span className="Talk-time">{data.start} - {data.end}</span>
          </div>
        </div>
      </div>
    </div>;
  }

  renderRailsGirlsTalk = () => {
    const data = this.getRailsGirlsData(this.props.talk);

    return <div className="Talk">
      <div className="Flex row alignCenter">
        <div className="Talk-multiplePhotos">
          {data.speakers.map((speaker) => {
            return <img key={speaker.twitter} src={speaker.imageUrl} alt={speaker.twitter} className="Talk-speakerPhotoSmall" />
          })}
        </div>
        <div className="Flex column alignStart">
          <div className="Talk-title">{data.title}</div>
          <div className="Talk-info">
            <span className="Talk-speaker">
              {data.speakers.map((speaker) => {
                return `${speaker.first_name} ${speaker.last_name}`;
              }).join(", ")}
            </span>
            <span className="Talk-time">{data.start} - {data.end}</span>
          </div>
        </div>
      </div>
    </div>;
  }

  render() {
    if (this.props.talk.speaker === "girls") {
      return this.renderRailsGirlsTalk();
    } else {
      return this.renderRegularTalk();
    }
  }

}
