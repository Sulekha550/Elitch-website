import React, { useState, useEffect, useRef } from 'react';

export default function CountUp({ value, duration = 1600, className = '' }) {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const match = value.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const rawNumberStr = match[2].replace(/,/g, '');
    const targetNumber = parseFloat(rawNumberStr);
    const suffix = match[3] || '';
    const isDecimal = rawNumberStr.includes('.');
    const decimalPlaces = isDecimal ? rawNumberStr.split('.')[1].length : 0;
    const hasCommas = match[2].includes(',');

    if (isNaN(targetNumber)) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTimestamp = null;

            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 4);
              const currentNum = easeOut * targetNumber;

              let formattedNum;
              if (isDecimal) {
                formattedNum = currentNum.toFixed(decimalPlaces);
              } else {
                formattedNum = Math.floor(currentNum).toString();
                if (hasCommas) {
                  formattedNum = formattedNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
              }

              setDisplayValue(`${prefix}${formattedNum}${suffix}`);

              if (progress < 1) {
                rafRef.current = window.requestAnimationFrame(step);
              } else {
                setDisplayValue(value);
              }
            };

            rafRef.current = window.requestAnimationFrame(step);
            if (elementRef.current) observer.unobserve(elementRef.current);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRef = elementRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className={`inline-block tabular-nums ${className}`}>
      {displayValue}
    </span>
  );
}

