import moment from 'moment';

import rawDays from '../data/schedule.yml';
import { extractEvent } from './events';

export function getCurrentTalk() {
  const currentTalk = getTodaysTalks().find(talk => {
    const talkStartTimestamp = moment(talk.startsAt, "H:mm").unix();
    const talkEndTimestamp = moment(talk.endsAt, "H:mm").unix();
    const startDifference = moment().unix() - talkStartTimestamp;
    const endDifference = talkEndTimestamp - moment().unix();

    return (startDifference > 0 && endDifference   > 0) ||
          (startDifference < 0 && startDifference > -(1 * 60)) ||
          (endDifference   < 0 && endDifference   > -(1 * 60));
  });

  console.log("Current Talk:", currentTalk);
  return currentTalk;
}

function getToday() {
  const todaysDate = moment().format('YYYY-MM-DD');

  return rawDays.find(rawDay => {
    return moment(rawDay.date).format('YYYY-MM-DD') === todaysDate;
  });
}

function getTodaysTalks() {
  const today = getToday();

  return today.events.filter(event => event.type === 'talk').map(extractEvent);
}
