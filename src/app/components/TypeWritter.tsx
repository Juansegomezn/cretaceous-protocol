'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 20, onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");

    const timer = setInterval(() => {
      setDisplayedText((prev) => text.slice(0, prev.length + 1));
      i++;
      
      if (i >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <>{displayedText}</>;
}