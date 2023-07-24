import {Tracker} from './types';

export const getTodaysDate = () => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based, so we add 1
  const year = today.getFullYear();

  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');

  return `${formattedDay}.${formattedMonth}.${year}`;
};

export const timeToSeconds = (time: string): number => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const secondsToTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export function convertDateFormatToMMDDYYYY(dateStr: string) {
  const [day, month, year] = dateStr.split('.');
  return `${month}/${day}/${year}`;
}

export const formatDateToDDMMYYYY = (dateStr: Date) => {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

function isDateInRange(date: string, startDate: string, endDate: string) {
  const currentDate = new Date(date);

  const start = new Date(startDate);
  const end = new Date(endDate);
  return currentDate >= start && currentDate <= end;
}

export function filterDataByDateRange(data: Tracker[], startDate: string, endDate: string) {
  const convertedStartDate = convertDateFormatToMMDDYYYY(startDate);
  const convertedEndDate = convertDateFormatToMMDDYYYY(endDate);

  return data.filter((item) => isDateInRange(convertDateFormatToMMDDYYYY(item.createdAt), convertedStartDate, convertedEndDate));
}
