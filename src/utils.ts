import {TodaysDate} from './types';

export const getTodaysDate = (): TodaysDate => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based, so we add 1
  const year = today.getFullYear();

  return {day, month, year};
};

export const timeToSeconds = (time: string): number => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};
