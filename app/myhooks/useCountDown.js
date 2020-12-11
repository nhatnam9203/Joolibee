import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
export const useCountDown = ({ callBackEnd }) => {
  const [second, setSecond] = useState(null);

  const startTimer = React.useCallback((time) => {
    setSecond(time);
  }, []);

  const endTimer = () => {
    setSecond(null);
    callBackEnd();
  };

  useEffect(() => {
    console.log('second', second);
    if (second) {
      const interval = setInterval(() => {
        if (second > 1) {
          setSecond((preSecond) => preSecond - 1);
        } else {
          endTimer();
          clearInterval(interval);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [second]);
  return { second, startTimer };
};
