import { getSpeakerBy } from './speakers';
import { getImagePathFor } from './images';

function getEventImagesPaths(rawEvent) {
  if (rawEvent.images) {
    return rawEvent.images.map(getImagePathFor)
  } else {
    return rawEvent.speakers.map(s => s.imagePath)
  }
}

export function extractEvent(rawEvent) {
  const speakers = rawEvent.speakers.map(s => getSpeakerBy({ twitter: s }))

  return {
    speakers,
    endsAt: rawEvent.end,
    imagesPaths: getEventImagesPaths(rawEvent),
    startsAt: rawEvent.start,
    title: rawEvent.title,
    type: rawEvent.type,
  }
}
