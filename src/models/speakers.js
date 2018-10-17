import _ from 'lodash';

import rawSpeakers from '../data/speakers.yml';

import { getImagePathFor } from "./images";
import { parameterize } from '../utils/string';

function extractSpeaker(rawSpeaker) {
  const name = `${rawSpeaker.first_name} ${rawSpeaker.last_name}`;
  const imageBaseName = parameterize(name);

  return {
    name,
    imagePath: getImagePathFor(imageBaseName),
    twitter: `@${rawSpeaker.twitter}`,
  }
}

export function getSpeakerBy(clauses) {
  const speaker = _.find(rawSpeakers, clauses);

  return extractSpeaker(speaker);
}
