import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import ErrorCard from "./ErrorCard";
const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

function Card({ movie, setMovie, setLoading }) {
  const [liked, setLiked] = useState(false);
  const [isFullPlotFetched, setIsFullPlotFetched] = useState(false);

  useEffect(() => {
    setIsFullPlotFetched(false);
  }, [movie.Title]);

  if (movie.Response === "False") {
    return <ErrorCard errorMessage={movie.Error} movieTitle={movie.searchText} />;
  }

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

  const getFullPlot = async () => {
    try {
      setLoading(true);
      if (isFullPlotFetched) return;

      console.log("Fetching full plot...");
      const fullPlotURL = `${apiURL}?apikey=${apiKey}&t=${encodeURIComponent(
        movie.Title
      )}&plot=full`;
      const response = await axios.get(fullPlotURL);
      console.log("Full plot fetched ...");

      setMovie((prevMovie) => ({
        ...prevMovie,
        Plot: response.data.Plot,
      }));

      setIsFullPlotFetched(true);
    } catch (error) {
      console.error("Error fetching full plot:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row bg-gray-800 bg-opacity-60 text-white shadow-lg rounded-lg shadow-blue-800 overflow-hidden mb-4 md:mb-8 w-full md:w-[80vw] border-2 border-blue-800">
      <button
        onClick={handleLikeToggle}
        className={`absolute top-4 right-4 flex items-center px-4 py-2 ${
          liked ? "bg-red-500" : "bg-blue-800"
        } text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:${
          liked ? "bg-red-700" : "bg-gray-700"
        } focus:outline-none`}
      >
        <FavoriteIcon className="mr-2" />
        {liked ? "Liked" : "Like"}
      </button>

      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full md:w-1/3 object-cover rounded-lg md:rounded-r-none"
      />

      <div className="ml-6 p-4 bg-transparent flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-bold">
            {movie.Title} ({movie.Year})
          </h2>
        </div>

        <p className="text-lg">
          <strong>IMDb Rating:</strong> {movie.imdbRating}/10 ({movie.imdbVotes}{" "}
          votes)
        </p>

        <p className="text-lg">
          <strong>Genre:</strong> {movie.Genre}
        </p>

        <p className="text-lg">
          <strong>Director:</strong> {movie.Director}
        </p>

        <p className="text-lg">
          <strong>Actors:</strong> {movie.Actors}
        </p>

        <p className="mt-4 mb-8">
          <strong>Plot:</strong> {movie.Plot}
        </p>
      </div>

      <button
        onClick={getFullPlot}
        disabled={isFullPlotFetched}
        className={`absolute bottom-4 right-4 px-6 py-2 border-2 border-blue-600 text-blue-600 bg-transparent rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white focus:outline-none ${
          isFullPlotFetched ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isFullPlotFetched ? "Full Plot Loaded" : "Full plot"}
      </button>
    </div>
  );
}

export default Card;
