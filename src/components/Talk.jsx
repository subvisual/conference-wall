import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Talk.scss';

export default class Talk extends Component {
  static propTypes = {
    endsAt: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    speaker: PropTypes.shape({
      name: PropTypes.string.isRequired,
      twitter: PropTypes.string.isRequired,
    }).isRequired,
    startsAt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { endsAt, imagePath, speakers, startsAt, title } = this.props;
    const photoStyle = { backgroundImage: `url('${imagePath}')` };

    return <div className="Talk">
      <div className="Flex row alignCenter">
        <div style={photoStyle} title={title} className="Talk-speakerPhoto" />
        <div className="Flex column alignStart">
          <div className="Talk-title">{title}</div>
          <div className="Talk-info">
            <span className="Talk-speaker">{speakers[0].name}</span>
            <span className="Talk-twitter">{speakers[0].twitter}</span>
            <span className="Talk-time">{startsAt} - {endsAt}</span>
          </div>
        </div>
      </div>
    </div>;
  }

}
