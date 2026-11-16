'use client';

import React, { useEffect, useState } from 'react';

interface ErrorDisplayProps {
  error: string | null;
  onDismiss?: () => void;
  autoHideDuration?: number;
}

export default function ErrorDisplay({ 
  error, 
  onDismiss, 
  autoHideDuration = 6000 
}: ErrorDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onDismiss?.();
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [error, autoHideDuration, onDismiss]);

  if (!isVisible || !error) return null;

  return (
    <div className="error-banner" role="alert" aria-live="polite">
      <div className="error-content">
        <svg className="i" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 7v5"/>
          <circle cx="12" cy="17" r="1"/>
        </svg>
        <span>{error}</span>
      </div>
      <button 
        className="icon-btn dismiss"
        onClick={() => {
          setIsVisible(false);
          onDismiss?.();
        }}
        aria-label="Dismiss error"
      >
        <svg className="i" viewBox="0 0 24 24">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}
