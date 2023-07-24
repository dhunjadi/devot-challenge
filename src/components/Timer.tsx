import {useEffect} from 'react';
import {TimerProps} from '../types';

const Timer = ({id, isActive, elapsedTime, onUpdateElapsedTime}: TimerProps) => {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        onUpdateElapsedTime(id, elapsedTime + 1); // Notify the parent component to update elapsedTime
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [id, isActive, elapsedTime, onUpdateElapsedTime]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div className="c-timer">{formatTime(elapsedTime)}</div>;
};

export default Timer;
