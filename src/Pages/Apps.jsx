import React, { useState } from "react";
import useApps from "../Hooks/useApps";
import AppsCard from "../Components/AppsCard";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Loading from "./loading";
import ErrorPage from "./ErrorPage";

const Apps = () => {
  const { apps, loading, error } = useApps();
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
    }, 300);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const term = search.trim().toLocaleLowerCase();
  const searchedApps = term
    ? apps.filter((app) =>
        (app.name || app.title || "").toLowerCase().includes(term)
      )
    : apps;

  return (
    <div className="w-full bg-[#f5f5f5] py-1">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Our All Applications</h1>
        <p className="text-gray-500 py-2">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:max-w-7xl mx-auto px-4 py-2">
        <div className="text-center py-1">
          <h1 className="text-xl font-semibold">
            ({searchedApps.length}) Apps Found
          </h1>
        </div>

        <label className="input  lg:mr-1">
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
            onChange={handleSearch}
            type="search"
            required
            placeholder="Search Apps"
          />
        </label>
      </div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {loading ? (
          <div className="col-span-full flex justify-center items-center min-h-80">
            <img className="w-40 h-40 animate-spin" src={logo} alt="loading" />
          </div>
        ) : searching ? (
          <div className="col-span-full flex justify-center items-center min-h-80">
            <img className="w-40 h-40 animate-spin" src={logo} alt="loading" />
          </div>
        ) : searchedApps.length ? (
          searchedApps.map((app) => <AppsCard key={app.id} app={app} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center min-h-80 gap-4">
            <p className="text-gray-500 text-2xl md:text-4xl font-semibold">
              No Apps Found
            </p>
            <Link to="/">
              <button className="btn rounded bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white hover:opacity-90 transition">
                Go Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apps;
