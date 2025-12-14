import React, { useState } from "react";
import download from "../assets/icon-downloads.png";
import rating from "../assets/icon-ratings.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarChart from "../Components/BarChart";

import { loadInstallation, removeFromUninstall } from "../Utils/LocalStorage";

const Installation = () => {
  const [installation, setInstallation] = useState(() => loadInstallation());
  const [sortOrder, setSortOrder] = useState("none");
  // useEffect(() => {
  //   const saveList = JSON.parse(localStorage.getItem("installation"));
  //   if (saveList) setInstallation(saveList);
  // }, []);

  const convertDownloads = (value) => {
    if (!value) return 0;

    if (typeof value === "number") return value;

    const v = value.toLowerCase();

    if (v.includes("m")) return parseFloat(v) * 1000000;
    if (v.includes("k")) return parseFloat(v) * 1000;

    return parseInt(v);
  };

  const sortedItem = () => {
    if (sortOrder === "downloads-asc") {
      return [...installation].sort(
        (a, b) => convertDownloads(a.downloads) - convertDownloads(b.downloads)
      );
    } else if (sortOrder === "downloads-desc") {
      return [...installation].sort(
        (a, b) => convertDownloads(b.downloads) - convertDownloads(a.downloads)
      );
    } else {
      return installation;
    }
  };

  const handleUninstall = (app) => {
    removeFromUninstall(app.id);
    setInstallation((prev) => prev.filter((p) => p.id !== app.id));
    toast.success(
      `${app.companyName} : ${app.title} Uninstalled successfully!`,
      {
        position: "top-right",
        theme: "dark",
      }
    );
  };

  return (
    <div className=" bg-[#f5f5f5]">
      <div className="text-center py-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Your Installed Apps
        </h1>
        <p className="text-gray-500">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>
      <div className="flex justify-between py-3 items-center  max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">
          ({sortedItem().length}) Apps Found
        </h1>
        <label>
          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort by downloads</option>
            <option value="downloads-asc">Low-&gt;High</option>
            <option value="downloads-desc">High-&gt;Low</option>
          </select>
        </label>
      </div>
      <div className="space-y-3  max-w-6xl mx-auto ">
        {sortedItem().map((p) => (
          <div
            key={p.id}
            className="  bg-base-100 shadow-sm  py-4 px-3 my-3 items-center flex justify-between rounded-2xl"
          >
            <div className="flex gap-4">
              <img
                className="w-[100px] h-[100px]  rounded-2xl  shadow-sm"
                src={p.image}
                alt={p.name}
              />
              <div className="py-1 content-center">
                <h2 className="font-semibold mx-auto">
                  {p.companyName} : {p.title}
                </h2>
                <div className="flex gap-5 py-2">
                  <div className="flex gap-2">
                    <img className="w-5 h-5" src={download} alt="" />
                    <p>{p.downloads}</p>
                  </div>
                  <div className="flex gap-2">
                    <img className="w-5 h-5" src={rating} alt="" />
                    <p>{p.ratingAvg}</p>
                  </div>
                  <p>{p.size} MB</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleUninstall(p)}
              className="btn text-white bg-[#00d390] mr-3"
            >
              Uninstall
            </button>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default Installation;
