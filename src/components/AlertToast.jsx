import React, { useState, useEffect } from "react";

export const AlertToastContainer = ({ alerts, removeAlert }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col-reverse gap-2 max-h-[calc(100vh-2rem)] overflow-y-auto">
      {alerts.map((alert) => (
        <AlertToast
          key={alert.id}
          {...alert}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
};

const AlertToast = ({ message, type = "info", duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / (duration / 100), 0));
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
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/30",
      border: "border-red-500",
      text: "text-red-800 dark:text-red-200",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/30",
      border: "border-yellow-500",
      text: "text-yellow-800 dark:text-yellow-200",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/30",
      border: "border-blue-500",
      text: "text-blue-800 dark:text-blue-200",
    },
  };

  const style = alertStyles[type];

  return (
    <div className="animate-slide-in-right min-w-[300px] max-w-[500px] pointer-events-auto">
      <div
        className={`relative flex items-center p-4 rounded-lg border shadow-lg backdrop-blur-sm ${style.bg} ${style.border} ${style.text}`}
      >
        <div className="flex-1 text-sm font-medium">{message}</div>
        <button
          onClick={onClose}
          className="ml-3 text-current opacity-70 hover:opacity-100 transition-opacity"
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
