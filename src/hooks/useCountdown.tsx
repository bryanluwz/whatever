import { useEffect, useState } from 'react';

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [config, setConfig] = useState<{
    stepms: number;
    onEnd?: () => void;
  }>({ stepms: 1000 });

  const reset = (timems: number, onEnd?: () => void, stepms = 1000) => {
    setTimeLeft(timems);
    setConfig({ stepms, onEnd });
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      config.onEnd?.();
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeLeft((prev) => Math.max(0, prev - config.stepms));
    }, config.stepms);

    return () => clearTimeout(timeoutId);
  }, [timeLeft, config]);

  return { timeLeft, reset };
};
