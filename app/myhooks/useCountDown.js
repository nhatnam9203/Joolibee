import React, { useState, useEffect } from 'react';
import { format } from '@utils';
export const useCountDown = (props) => {
  const [second, setSecond] = useState(10);
  const currentSecond = format.dateTime(new Date(), 'ss');
  console.log('currentSecond', currentSecond);
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((preSecond) => {
        if (preSecond <= 1) {
          clearInterval(interval);
          return 10;
        } else {
          return preSecond - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return second;
};
