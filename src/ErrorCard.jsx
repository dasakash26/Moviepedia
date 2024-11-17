import React from "react";

function ErrorCard({ errorMessage, movieTitle }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-gray-800 bg-opacity-60 text-white p-6 rounded-lg shadow-lg mb-3 border-2 border-slate-500">
      <h2 className="text-3xl font-bold mb-4">OOPS!!</h2>
      <p className="text-lg mb-4">" {movieTitle} "</p>
      <p className="text-lg mb-4">{errorMessage}</p>
      <div className="text-6xl">😢</div>
    </div>
  );
}

export default ErrorCard;
