import React, { useEffect, useState } from "react";
import download from "../assets/icon-downloads.png";
import rating from "../assets/icon-ratings.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarChart from "../Components/BarChart";

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
    toast.success("Item Removed Successfully!", {
      position: "top-right",
      theme: "dark",
    });
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
              onClick={() => handleUninstall(p.id)}
              className="btn text-white bg-[#00d390] mr-3"
            >
              Uninstall
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
      <BarChart></BarChart>
      <div className="text-gray-500 max-w-7xl mx-auto gap-4 py-6">
        <h1 className="text-3xl font-bold">Description</h1>
        <p className="py-4">
          This focus app takes the proven Pomodoro technique and makes it even
          more practical for modern lifestyles. Instead of just setting a timer,
          it builds a complete environment for deep work, minimizing
          distractions and maximizing concentration. Users can create custom
          work and break intervals, track how many sessions they complete each
          day, and review detailed statistics about their focus habits over
          time. The design is minimal and calming, reducing cognitive load so
          you can focus entirely on the task at hand. Notifications gently let
          you know when to pause and when to resume, helping you maintain a
          healthy rhythm between work and rest.
        </p>
        <p className="py-4">
          A unique feature of this app is the integration of task lists with
          timers. You can assign each task to a specific Pomodoro session,
          making your schedule more structured. The built-in analytics show not
          only how much time you’ve worked but also which tasks consumed the
          most energy. This allows you to reflect on your efficiency and adjust
          your workflow accordingly. The app also includes optional background
          sounds such as white noise, nature sounds, or instrumental music to
          create a distraction-free atmosphere.
        </p>
        <p className="py-4">
          For people who struggle with procrastination, the app provides
          motivational streaks and achievements. Completing multiple Pomodoro
          sessions unlocks milestones, giving a sense of accomplishment. This
          gamified approach makes focusing more engaging and less like a chore.
          Whether you’re studying for exams, coding, writing, or handling office
          work, the app adapts to your routine. By combining focus tracking,
          task management, and motivational tools, this Pomodoro app ensures
          that you not only work harder but also smarter. It is a personal
          trainer for your brain, keeping you disciplined, refreshed, and
          productive throughout the day.
        </p>
      </div>
    </div>
  );
};

export default Installation;
