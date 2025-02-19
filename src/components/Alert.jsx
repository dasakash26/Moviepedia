import React, { useState, useEffect } from "react";

const AlertContainer = ({ alerts, removeAlert }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          {...alert}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
};

const Alert = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
  showIcon = true,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (duration / 100);
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [duration, onClose]);

  const alertStyles = {
    success: {
      bg: "bg-green-50 dark:bg-green-900/30",
      border: "border-green-500",
      text: "text-green-800 dark:text-green-200",
      icon: (
        <svg
          className="w-5 h-5 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/30",
      border: "border-red-500",
      text: "text-red-800 dark:text-red-200",
      icon: (
        <svg
          className="w-5 h-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
      border: "border-yellow-500",
      text: "text-yellow-800 dark:text-yellow-200",
      icon: (
        <svg
          className="w-5 h-5 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/30",
      border: "border-blue-500",
      text: "text-blue-800 dark:text-blue-200",
      icon: (
        <svg
          className="w-5 h-5 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const style = alertStyles[type];

  return (
    <div className="animate-slide-in-right">
      <div
        className={`flex items-center p-4 mb-1 rounded-lg border ${style.bg} ${style.border} ${style.text}`}
      >
        {showIcon && <div className="mr-3">{style.icon}</div>}
        <div className="flex-1 text-sm font-medium">{message}</div>
        <button
          onClick={onClose}
          className="ml-3 inline-flex h-5 w-5 items-center justify-center hover:opacity-70 focus:outline-none"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export { Alert, AlertContainer };
