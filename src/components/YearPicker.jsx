import React from "react";

function YearPicker({ year, setYear }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="relative">
      <select
        id="year-select"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-[140px] h-12 appearance-none px-4 pr-8 text-blue-100 
                 bg-gradient-to-r from-blue-900 to-blue-800 backdrop-blur-sm 
                 rounded-lg cursor-pointer border border-blue-700/50 
                 hover:border-blue-500 hover:from-blue-800 hover:to-blue-700/40
                 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 
                 transition-all duration-300 [&>*]:max-h-[300px]
                 shadow-lg shadow-blue-900/20"
      >
        <option value="" className="bg-blue-900">
          Select Year
        </option>
        {years.map((y) => (
          <option key={y} value={y} className="bg-blue-900">
            {y}
          </option>
        ))}
      </select>
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none
                    transition-transform duration-200 group-hover:translate-y-[2px]"
      >
        <svg
          className="w-4 h-4 text-blue-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default YearPicker;
