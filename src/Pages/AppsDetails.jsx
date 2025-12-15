import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useApps from "../Hooks/useApps";
import downloadIcon from "../assets/icon-downloads.png";
import rating from "../assets/icon-ratings.png";
import review from "../assets/icon-review.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BarChart from "../Components/BarChart";
import Loading from "./loading";
import ErrorPage from "./ErrorPage";
import ErrorApps from "../Components/ErrorApps";

const AppsDetails = () => {
  const { id } = useParams();
  const { apps, loading, error } = useApps();

  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const installedApps =
      JSON.parse(localStorage.getItem("installation")) || [];
    const exists = installedApps.some((item) => Number(item.id) === Number(id));
    setIsInstalled(exists);
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const app = apps.find((item) => Number(item.id) === Number(id));

  if (!app) {
    return <ErrorApps />;
  }

  const handleInstall = () => {
    const installedApps =
      JSON.parse(localStorage.getItem("installation")) || [];

    const exists = installedApps.some(
      (item) => Number(item.id) === Number(app.id)
    );

    if (exists) {
      toast.error(`"${app.title}" is already installed!`);
      setIsInstalled(true);
      return;
    }

    const updatedApps = [...installedApps, app];
    localStorage.setItem("installation", JSON.stringify(updatedApps));
    setIsInstalled(true);
    toast.success(
      `"${app.companyName} : ${app.title}" installed successfully!`
    );
  };

  return (
    <div className="px-4  bg-[#f8f8f8]">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto py-2 lg:py-6">
        <div className="shrink-0">
          <img
            className="w-full md:w-80 h-80 rounded-3xl shadow"
            src={app.image}
            alt={app.title}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {app.companyName} : {app.title}
            </h2>

            <p className="mb-4">
              Developed by{" "}
              <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">
                productive.io
              </span>
            </p>

            <div className="flex gap-6 py-6">
              <div>
                <img className="w-10 h-10 mb-1" src={downloadIcon} alt="" />
                <p>Downloads</p>
                <h1 className="font-bold text-2xl">{app.downloads}</h1>
              </div>
              <div>
                <img className="w-10 h-10 mb-1" src={rating} alt="" />
                <p>Average Ratings</p>
                <h1 className="font-bold text-2xl">{app.ratingAvg}</h1>
              </div>
              <div>
                <img className="w-10 h-10 mb-1" src={review} alt="" />
                <p>Total Reviews</p>
                <h1 className="font-bold text-2xl">{app.reviews}</h1>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pb-6">
            <button
              onClick={handleInstall}
              disabled={isInstalled}
              className={`px-6 py-2 rounded text-white font-semibold bg-linear-to-r from-[#632EE3] to-[#9F62F2] ${
                isInstalled
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:opacity-90"
              }`}
            >
              {isInstalled ? "Installed" : `Install Now (${app.size} MB)`}
            </button>

            <Link to="/apps">
              <button className="px-6 py-2 rounded bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold hover:opacity-90">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>

      <BarChart />
      <ToastContainer position="top-right" autoClose={1500} />

      <div className="text-gray-500 max-w-6xl mx-auto py-6">
        <h1 className="text-3xl font-bold">Description </h1>
        <p className="py-3">{app.description}</p>
      </div>
    </div>
  );
};

export default AppsDetails;
