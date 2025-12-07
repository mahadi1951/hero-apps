import React, { useEffect, useState } from "react";
import download from "../assets/icon-downloads.png";
import rating from "../assets/icon-ratings.png";
import { toast } from "react-toastify";

const Installation = () => {
  const [installation, setInstallation] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  useEffect(() => {
    const saveList = JSON.parse(localStorage.getItem("installation"));
    if (saveList) setInstallation(saveList);
  }, []);

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

  const handleUninstall = (id) => {
    const existingList = JSON.parse(localStorage.getItem("installation"));
    let updateList = existingList.filter((p) => p.id !== id);
    setInstallation(updateList);
    localStorage.setItem("installation", JSON.stringify(updateList));
    toast.success(`Removed resolved task ${id}`, {
      theme: "light",
      style: {
        color: "black",
        backgroundColor: "white",
      },
    });
  };
  return (
    <div className=" bg-[#f5f5f5]">
      <div className="flex justify-between py-3 items-center  max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold">
          Installation
          <span className="text-sm text-gray-400">
            ({sortedItem().length}) Apps Found
          </span>
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
      <div className="space-y-3  max-w-6xl mx-auto">
        {sortedItem().map((p) => (
          <div
            key={p.id}
            className="  bg-base-100 shadow-sm  py-1 px-3 my-3 items-center flex justify-between"
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
              onClick={() => handleUninstall(p.id)}
              className="btn text-white bg-[#00d390]"
            >
              Uninstall
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Installation;
