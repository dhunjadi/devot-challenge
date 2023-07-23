import {useEffect, useState} from 'react';
import {TimerProps} from '../types';

const Timer = ({isActive, timeLogged}: TimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(timeLogged || 0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval!);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div className="c-timer">{formatTime(elapsedTime)}</div>;
};

export default Timer;
