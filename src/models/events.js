import { getSpeakerBy } from './speakers';

export function extractEvent(rawEvent) {
  const speakers = rawEvent.speakers.map(s => getSpeakerBy({ twitter: s }))
  const imagePath = speakers[0] ? speakers[0].imagePath : undefined;

  return {
    imagePath,
    speakers,
    endsAt: rawEvent.end,
    startsAt: rawEvent.start,
    title: rawEvent.title,
    type: rawEvent.type,
  }
}

export default {
  extract: extractEvent,
}
