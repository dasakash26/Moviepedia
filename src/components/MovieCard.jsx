import React, { memo } from "react";

const MovieCard = memo(({ movie, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-800/30"
  >
    <div className="relative aspect-[2/3] overflow-hidden">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.1]"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
        }}
      />
      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90" />

      {/* Movie Title with better positioning */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <h3 className="text-amber-50/95 font-bold text-lg leading-snug line-clamp-2 drop-shadow-sm">
          {movie.Title}
        </h3>
      </div>

      {/* Rating badge with subtle design */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-yellow-500/85 text-black font-bold px-2.5 py-1 rounded text-sm flex items-center gap-1">
          ★ {movie.imdbRating || "N/A"}
        </span>
      </div>

      {/* Info overlay with smoother transition */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-600/90 text-white px-2.5 py-0.5 rounded text-sm">
              {movie.Year}
            </span>
            {movie.Genre?.split(",")
              .slice(0, 2)
              .map((genre, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700/80 text-gray-100 px-2 py-0.5 rounded text-xs"
                >
                  {genre.trim()}
                </span>
              ))}
          </div>

          <div className="space-y-1.5 text-sm">
            {movie.Director && (
              <p className="text-gray-200 line-clamp-1">
                <span className="text-gray-400">Director:</span>{" "}
                {movie.Director}
              </p>
            )}
            {movie.Actors && (
              <p className="text-gray-300 line-clamp-2">
                <span className="text-gray-400">Cast:</span> {movie.Actors}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
));

MovieCard.displayName = "MovieCard";

export default MovieCard;
