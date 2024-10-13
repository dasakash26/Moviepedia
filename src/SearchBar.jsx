import React, { useState } from "react";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

function SearchBar({ movie, setLoading }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      setIsExpanded(false);
    }, 8000);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleClick = async (event) => {
    try {
      setLoading(true);
      const query = searchText.trim();
      if (!query) return;
      event.preventDefault();
      const reqURL = `${apiURL}?apikey=${apiKey}&t="${query}"`;
      const res = await axios.get(reqURL);
      movie(res.data);
    } catch (error) {
      console.error("something went wrong :", error.message);
    } finally {
      setSearchText("");
      setLoading(false);
    }
  };

  return (
    <div className={`search flex items-center m-2`}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchText}
        onClick={handleExpand}
        onChange={handleChange}
        className={`p-2 rounded-l-lg border-none outline-none bg-slate-200 transition-all duration-200 ease-in-out focus:shadow-lg ${
          isExpanded ? "w-64 md:w-96" : "w-24 md:w-40"
        }`}
      />
      <button
        onClick={handleClick}
        className="bg-slate-800 text-white p-2 rounded-r-lg relative overflow-hidden hover:bg-slate-700 focus:outline-none transition duration-300"
      >
        Search
        <span className="absolute inset-0 rounded-r-lg bg-white opacity-20 transition transform scale-0 hover:scale-100 duration-500"></span>
      </button>
    </div>
  );
}

export default SearchBar;
