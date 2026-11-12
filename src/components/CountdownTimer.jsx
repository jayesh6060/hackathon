import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate = "2026-11-25T09:00:00+05:30" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 21,
    hours: 9,
    minutes: 18,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <div className="inline-flex items-center bg-[#101A2B]/75 border border-[#F6A43A]/35 rounded-xl backdrop-blur-md px-3 sm:px-5 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center px-2.5 sm:px-4 min-w-[52px] sm:min-w-[64px]">
            <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#F3EBDD] leading-none tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[9px] font-display font-semibold tracking-[0.22em] text-[#F6A43A] uppercase mt-1">
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <div className="h-7 w-[1px] bg-white/15" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
