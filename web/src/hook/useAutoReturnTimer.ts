import { useCallback, useEffect, useRef, useState } from "react";

type UseAutoReturnTimer = (
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
) => {
  clearAutoReturnTimer: () => void;
  remainingTime: number;
};

export const useAutoReturnTimer: UseAutoReturnTimer = (step, setStep) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(60);

  const clearAutoReturnTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (step === 2) {
      setRemainingTime(60);
      const countdown = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown);
            timerRef.current = null;
            setStep(1);
            return 60;
          }
          return prevTime - 1;
        });
      }, 1000);
      timerRef.current = countdown;

      return () => {
        clearInterval(countdown);
        timerRef.current = null;
      };
    }

    if (step === 1) {
      clearAutoReturnTimer();
      setRemainingTime(60);
    }

    return () => clearAutoReturnTimer();
  }, [step, clearAutoReturnTimer, setStep]);

  return { clearAutoReturnTimer, remainingTime };
};
