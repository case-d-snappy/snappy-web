import { useInterval } from 'hooks/useInterval';
import { useEffect, useState } from 'react';

const TIMEOUT_DURATION = 60; // 1 minutes

export function CountdownTimer({
  minutes,
  setIsTimeout,
}: {
  minutes: number;
  setIsTimeout: (isTimeout: boolean) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(TIMEOUT_DURATION * minutes);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (timeLeft === 0) {
      setIsTimeout(true);
    }
  }, [timeLeft, setIsTimeout]);

  useInterval(() => {
    setTimeLeft(prevTime => (prevTime === 0 ? prevTime : prevTime - 1));
  }, 1000);

  return (
    <span className="absolute right-2 top-7.5 text-sm text-gray-500">
      {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </span>
  );
}
