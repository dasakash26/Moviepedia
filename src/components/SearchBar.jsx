import React, { useState, useRef, useEffect } from "react";
import { fetchFromOMDB } from "../services/api.js";
import YearPicker from "./YearPicker";
import { FaSearch } from "react-icons/fa";
import { useToast } from "../hooks/useToast";

function SearchBar({ movie, setLoading }) {
  const toast = useToast();
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [year, setYear] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    setHistory(JSON.parse(localStorage.getItem("searchHistory")) || []);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveToHistory = (query) => {
    if (!query || history.includes(query)) return;
    const updatedHistory = [query, ...history].slice(0, 100);
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
    setError("");
    setHistoryIndex(-1);
    setShowHistory(true);
  };

  const handleClick = async (event) => {
    event?.preventDefault();
    const query = searchText.trim();
    if (!query) return;

    try {
      setLoading(true);
      setError("");
      const yearQuery = year ? `&y=${year}` : "";
      const searchParams = `?t=${query}${yearQuery}`;
      const data = await fetchFromOMDB(searchParams);

      if (data.Response !== "True") {
        const errorMessage = `Could not find "${query}"${
          year ? ` from year ${year}` : ""
        }`;
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.success(`Found "${data.Title}" (${data.Year})`);
        data.searchText = query;
        movie(data);
        setSearchText("");
        saveToHistory(query);
      }
    } catch (error) {
      const errorMessage = "Something went wrong. Please try again.";
      setError(errorMessage);
      console.error("API call failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeys = ({ key }) => {
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

  const selectHistoryItem = (item) => {
    setSearchText(item);
    setShowHistory(false);
    setHistoryIndex(-1);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8">
        <div
          ref={searchRef}
          className="flex flex-col items-center space-y-4 max-w-4xl mx-auto"
        >
          <div className="w-full grid grid-cols-1 sm:grid-cols-[auto,1fr,auto] gap-4 items-start">
            <YearPicker year={year} setYear={setYear} />

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchText}
                onClick={() => setShowHistory(true)}
                onChange={handleChange}
                onKeyDown={handleKeys}
                className="relative w-full h-12 px-4 pl-10 rounded-lg text-blue-100 
                         bg-slate-900/90 backdrop-blur-sm border border-blue-500/30
                         group-hover:border-blue-400/50 focus:outline-none focus:border-blue-400 
                         focus:ring-2 focus:ring-blue-400/50 transition duration-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
              {showHistory && history.length > 0 && (
                <div
                  className="absolute z-10 w-full mt-2 bg-slate-900/95 backdrop-blur-sm
                              rounded-lg shadow-2xl shadow-blue-500/20 max-h-60 overflow-y-auto 
                              border border-blue-500/20 animate-fadeIn"
                >
                  {history.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => selectHistoryItem(item)}
                      className={`px-4 py-3 cursor-pointer transition-all duration-200 
                                flex items-center gap-3 text-blue-100
                                hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-400/10 ${
                                  index === historyIndex
                                    ? "bg-gradient-to-r from-blue-500/10 to-cyan-400/10"
                                    : ""
                                }`}
                    >
                      <FaSearch className="text-cyan-400 text-sm flex-shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleClick}
              disabled={!searchText.trim()}
              className={`h-12 px-8 rounded-lg font-medium transition-all 
                         duration-300 flex items-center justify-center gap-2 whitespace-nowrap
                         hover:scale-105 active:scale-95 disabled:hover:scale-100
                         ${
                           searchText.trim()
                             ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/20"
                             : "bg-slate-800/50 text-slate-400 cursor-not-allowed"
                         }`}
            >
              Search
            </button>
          </div>
          {error && (
            <div
              className="mt-2 w-full px-4 py-3 bg-blue-500/10 border border-blue-500/20
                          text-blue-200 rounded-lg text-sm text-center backdrop-blur-sm
                          animate-fadeIn"
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
