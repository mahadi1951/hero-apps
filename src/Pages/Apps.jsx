import React, { useState } from "react";
import useApps from "../Hooks/useApps";
import AppsCard from "../Components/AppsCard";
import { Link } from "react-router-dom";

const Apps = () => {
  const { apps, loading, error } = useApps();
  const [search, setSearch] = useState("");

 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const term = search.trim().toLocaleLowerCase();
  const searchedApps = term
    ? apps.filter((app) =>
        (app.name || app.title || "").toLowerCase().includes(term)
      )
    : apps;

  return (
    <div className="w-full bg-[#f5f5f5]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Our All Applications</h1>
        <p className="text-gray-500 py-3">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>
      <div className="flex justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-xl font-semibold">
            ({searchedApps.length}) Apps Found
          </h1>
        </div>

        <label className="input mr-3">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            required
            placeholder="Search Apps"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3 mb-3 max-w-7xl mx-auto">
        {searchedApps.map((app) => (
          <AppsCard key={app.id} app={app}></AppsCard>
        ))}
      </div>
    </div>
  );
};

export default Apps;
