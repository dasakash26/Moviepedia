import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

function SearchBar({ movie, setLoading }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const timeoutId = useRef(null);

  const saveToHistory = (query) => {
    if (!query || history.includes(query)) return;
    const updatedHistory = [query, ...history].slice(0, 100);
    setHistory(updatedHistory);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setIsExpanded(false);
    }, 4000);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
    setError("");
    setHistoryIndex(-1);
  };

  const handleClick = async (event) => {
    event?.preventDefault();
    const query = searchText.trim();
    if (!query) return;

    try {
      setLoading(true);
      setError("");
      const reqURL = `${apiURL}?apikey=${apiKey}&t=${query}`;
      const { data } = await axios.get(reqURL);

      if (data.Response !== "True") {
        setError("Movie not found");
      }
      data.searchText = query;
      movie(data);
      setSearchText("");
      saveToHistory(query);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("API call failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeys = ({ key }) => {
    handleExpand();

    if (key === "Enter") {
      handleClick();
    } else if (key === "ArrowUp") {
      const newIndex =
        historyIndex === -1
          ? 0
          : Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setSearchText(history[newIndex] || "");
    } else if (key === "ArrowDown") {
      const newIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(historyIndex - 1, 0);
      setHistoryIndex(newIndex);
      setSearchText(history[newIndex] || "");
    }
  };

  return (
    <div className="search flex flex-col items-center m-2">
      <div className="flex items-center">
        <input
          type="text"
          placeholder={error || "🔍 Search movies..."}
          value={searchText}
          onClick={handleExpand}
          onChange={handleChange}
          onKeyDown={handleKeys}
          className={`p-3 rounded-l-lg text-black border-none outline-none bg-slate-200 transition-all duration-300 ease-in-out focus:shadow-lg focus:border-2 focus:border-blue-800 ${
            isExpanded ? "w-64 lg:w-96" : "w-24 lg:w-40"
          }`}
        />
        <button
          onClick={handleClick}
          className="bg-blue-800 text-white p-3 rounded-r-lg relative overflow-hidden hover:bg-blue-600 focus:outline-none transition duration-300"
        >
          Search
          <span className="absolute inset-0 rounded-r-lg bg-white opacity-20 transition transform scale-0 hover:scale-100 duration-500"></span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
