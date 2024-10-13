import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-80 border-t-blue-600"></div>
    </div>
  );
}

export default LoadingSpinner;
