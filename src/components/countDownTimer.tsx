import React, {useState, useEffect, useRef} from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  fromDate?: string
  toDate?: string
}

const calculateTimeLeft = (toDate: string='2021-01-01') => {
  const difference = +new Date(toDate) - +new Date();
  let timeLeft = {} as TimeLeft;

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export default function CountdownTimer({toDate='2021-01-01', fromDate}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(toDate));
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    //console.log('effect', ref.current)
    return () => {
      if(ref.current) {
        //console.log('clear', ref.current)
        clearTimeout(ref.current)
      }
    } 
  });
  const timerComponents :JSX.Element[] = [];
  Object.keys(timeLeft).forEach((interval) => {
    if(!Reflect.get(timeLeft,interval)) {
      return
    }
    timerComponents.push(
      <span key={interval}>
        {Reflect.get(timeLeft,interval)} {interval}{" "}
      </span>
    );
  });
  // console.log('before render')  
  return (
    <div>
      <h1>New Year's 2021 Countdown</h1>
      <h3>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </h3>
      
    </div>
  );
}

