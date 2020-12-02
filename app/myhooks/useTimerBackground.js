import React, { useState, useEffect, useCallback } from 'react';

import BackgroundTimer from 'react-native-background-timer';

export const useTimerBackground = (countdown_start, timming, callBack) => {
  const [number, setNumber] = useState(countdown_start);

  //   const onStopBackgroundTimer = useCallback(() => {
  //     BackgroundTimer.stopBackgroundTimer();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  useEffect(() => {
    if (timming) {
      if (number <= 1) {
        BackgroundTimer.stopBackgroundTimer();
        callBack();
      } else {
        BackgroundTimer.runBackgroundTimer(() => {
          setNumber((preNumber) => {
            return preNumber - 1;
          });
        }, 1000);
      }
    } else {
      setNumber(countdown_start);
    }

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, timming]);
  return number;
};
