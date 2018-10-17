import { getSpeakerBy } from './speakers';
import { getImagePathFor } from './images';

function getEventImagesPaths(rawEvent, speakers) {
  if (rawEvent.images) {
    return rawEvent.images.map(getImagePathFor)
  } else {
    return speakers.map(s => s.imagePath)
  }
}

export function extractEvent(rawEvent) {
  if (!rawEvent) return;

  const speakers = rawEvent.speakers.map(s => getSpeakerBy({ twitter: s }))

  return {
    speakers,
    endsAt: rawEvent.end,
    imagesPaths: getEventImagesPaths(rawEvent, speakers),
    startsAt: rawEvent.start,
    title: rawEvent.title,
    type: rawEvent.type,
  }
}
