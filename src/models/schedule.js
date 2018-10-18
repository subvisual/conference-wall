import moment from 'moment';

import rawDays from '../data/schedule.yml';
import { extractEvent } from './events';

export function getCurrentTalk() {
  const nowTimestamp = moment().unix();

  return getTodaysTalks().find(talk => {
    const talkStartTimestamp = moment(talk.startsAt, "H:mm").unix();
    const talkEndTimestamp = moment(talk.endsAt, "H:mm").unix();
    const startDifference = nowTimestamp - talkStartTimestamp;
    const endDifference = talkEndTimestamp - nowTimestamp;

    return (startDifference > 0 && endDifference   > 0) ||
          (startDifference < 0 && startDifference > -(1 * 60)) ||
          (endDifference   < 0 && endDifference   > -(1 * 60));
  });
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

export function getUpcomingTalk() {
  return getTodaysTalks().find((talk) => {
    const talkStartTimestamp = moment(talk.startsAt, "H:mm").unix();
    const difference = talkStartTimestamp - moment().unix();

    return difference > 0 && difference < (15 * 60);
  });
}
