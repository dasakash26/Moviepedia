import React from "react";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="relative w-16 h-16">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="absolute w-3 h-3 bg-blue-600 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${index * 30}deg) translate(0, -150%)`,
              opacity: 1 - (index * 0.08),
              animation: `spinnerDot 1.2s linear infinite`,
              animationDelay: `${-0.1 * index}s`
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes spinnerDot {
          0% {
            transform: rotate(0deg) translate(0, -150%);
          }
          100% {
            transform: rotate(360deg) translate(0, -150%);
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;
