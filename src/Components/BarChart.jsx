import React from "react";

const BarChart = () => {
  const ratings = [
    { name: "1 star", count: 50 },
    { name: "2 star", count: 60 },
    { name: "3 star", count: 150 },
    { name: "4 star", count: 260 },
    { name: "5 star", count: 330 },
  ];
  const maxValue = Math.max(...ratings.map((r) => r.count));

  return (
    <div className="w-full max-w-7xl mx-auto mt-2">
      <h2 className="text-xl font-semibold mb-4">Ratings</h2>

      {/* Bars */}
      {ratings.map((r, i) => (
        <div key={i} className="flex items-center gap-4 mb-4 py-4">
          <span className="w-14 text-sm">{r.name}</span>

          <div className="flex-1 bg-gray-200 rounded">
            <div
              className="h-4 bg-orange-500 rounded"
              style={{
                width: `${(r.count / maxValue) * 100}%`,
                background:
                  "linear-gradient(to right, #FFB74D, #FB8C00, #F57C00)",
              }}
            ></div>
          </div>
        </div>
      ))}

      {/* Bottom Common Number Axis */}
      <div className="mt-6 flex justify-between text-sm text-gray-600 w-full pl-16">
        <span>0</span>
        <span>3000</span>
        <span>6000</span>
        <span>9000</span>
        <span>12000</span>
      </div>

      {/* Bottom Line */}
    </div>
  );
};

export default BarChart;
