import React, { useState } from "react";

const BarChart = ({ ratings }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!Array.isArray(ratings) || ratings.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">No rating data available</p>
    );
  }

  const sortedByStar = [...ratings].sort((a, b) => {
    const getStar = (r) => Number(r.name.split(" ")[0]);
    return getStar(b) - getStar(a);
  });

  const allCounts = ratings.map((r) => r.count);
  const maxCount = Math.max(...allCounts);

  const dynamicTicks = [0, ...allCounts].sort((a, b) => a - b);

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-lg max-w-7xl mx-auto my-6 font-sans">
      <h2 className="text-[#1a2b4b] text-lg sm:text-xl font-bold mb-4 sm:mb-6">
        Ratings
      </h2>

      <div className="space-y-3 sm:space-y-4 mb-2">
        {sortedByStar.map((r, id) => (
          <div key={id} className="flex items-center gap-2 sm:gap-4">
            <span className="w-12 sm:w-16 text-xs sm:text-sm text-gray-500">
              {r.name}
            </span>

            <div
              className="flex-1 bg-transparent h-5 sm:h-6 lg:h-8 relative"
              onMouseEnter={() => setHoveredIndex(id)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="h-full rounded-sm bg-[#ff8a00]"
                style={{
                  width: `${(r.count / maxCount) * 100}%`,
                }}
              />

              {hoveredIndex === id && (
                <div className="absolute -top-7 sm:-top-8 right-0 bg-gray-800 text-white text-[10px] sm:text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  <p className="text-center font-semibold">{r.name}</p>
                  <p>{r.count} votes</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="w-12 sm:w-16"></div>

        <div className="flex-1 relative h-6 mt-2">
          {dynamicTicks.map((val, idx) => (
            <span
              key={idx}
              className="absolute text-[10px] sm:text-sm text-gray-400 transform -translate-x-1/2"
              style={{
                left: `${(val / maxCount) * 100}%`,
              }}
            >
              {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChart;
