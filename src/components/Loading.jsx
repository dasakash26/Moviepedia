import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Loading.module.css";

function LoadingSpinner({
  message = "Loading...",
  size = "md",
  overlay = true,
  color = "blue-purple",
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const colorClasses = {
    "blue-purple": "from-blue-500 to-purple-500",
    "green-teal": "from-green-500 to-teal-500",
    "red-orange": "from-red-500 to-orange-500",
  };

  const spinnerDots = useMemo(
    () =>
      [...Array(12)].map((_, index) => (
        <div
          key={index}
          className={`absolute w-2.5 h-2.5 bg-gradient-to-r ${colorClasses[color]} rounded-full ${styles.spinnerDot}`}
          style={{
            left: "50%",
            top: "50%",
            transform: `rotate(${index * 30}deg) translate(0, -150%)`,
            opacity: 1 - index * 0.08,
            animationDelay: `${-0.1 * index}s`,
          }}
        />
      )),
    [color]
  );

  const Wrapper = ({ children }) =>
    overlay ? (
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col gap-4 justify-center items-center z-50 ${styles.fadeInOut}`}
        role="dialog"
        aria-modal="true"
        aria-label="Loading indicator"
      >
        {children}
      </div>
    ) : (
      <div
        className="flex flex-col gap-4 justify-center items-center"
        role="status"
        aria-live="polite"
      >
        {children}
      </div>
    );

  return (
    <Wrapper>
      <div className={`relative ${sizeClasses[size]}`} aria-hidden="true">
        {spinnerDots}
      </div>
      {message && (
        <p className="text-white/90 text-lg font-medium animate-pulse">
          {message}
        </p>
      )}
    </Wrapper>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  overlay: PropTypes.bool,
  color: PropTypes.oneOf(["blue-purple", "green-teal", "red-orange"]),
};

export default React.memo(LoadingSpinner);
