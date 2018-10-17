import { getSpeakerBy } from './speakers';

export function extractEvent(rawEvent) {
  const speakers = rawEvent.speakers.map(s => getSpeakerBy({ twitter: s }))
  const imagePath = speakers[0] ? speakers[0].imagePath : undefined;

  const extractedEvent = {
    imagePath,
    speakers,
    endsAt: rawEvent.end,
    startsAt: rawEvent.start,
    title: rawEvent.title,
    type: rawEvent.type,
  }
  console.log("Raw event", rawEvent);
  console.log("Extracted event", extractedEvent);

  return extractedEvent;
}

export default {
  extract: extractEvent,
}
