import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Talk.scss';

export default class Talk extends Component {
  static propTypes = {
    endsAt: PropTypes.string.isRequired,
    imagesPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
    speakers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        twitter: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    startsAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  get speakersNames () {
    return this.props.speakers.map(s => s.name).join(', ');
  }

  renderImage = (imagePath, idx) => {
    const photoStyle = { backgroundImage: `url('${imagePath}')` };

    return <div key={idx} style={photoStyle} title={this.props.title} className="Talk-speakerPhoto" />
  }

  renderSpeaker = (speaker, idx) => <div key={idx} className="Talk-speaker">
    <span className="Talk-speakerName">{speaker.name}</span>
    <span className="Talk-speakerTwitter">{speaker.twitter}</span>
  </div>

  render() {
    const { endsAt, imagesPaths, speakers, startsAt, title } = this.props;

    return <div className="Talk">
      <div className="Flex row alignCenter">
        {imagesPaths.map(this.renderImage)}
        <div className="Flex column alignStart">
          <div className="Talk-title">{title}</div>
          <div className="Talk-info">
            <div className="Talk-speakers">
              {speakers.map(this.renderSpeaker)}
            </div>
            <span className="Talk-time">{startsAt} - {endsAt}</span>
          </div>
        </div>
      </div>
    </div>;
  }

}
