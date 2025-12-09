import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useApps from "../Hooks/useApps";
import appError from "../assets/App-Error.png";
import downloadIcon from "../assets/icon-downloads.png";
import rating from "../assets/icon-ratings.png";
import review from "../assets/icon-review.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppsDetails = () => {
  const { id } = useParams();
  const { apps, loading, error } = useApps();

  const [isInstalled, setIsInstalled] = useState(false);

  // check installed apps on initial render
  useEffect(() => {
    const installedApps =
      JSON.parse(localStorage.getItem("installation")) || [];
    const exists = installedApps.some((item) => Number(item.id) === Number(id));
    setIsInstalled(exists);
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10">Error loading app data</p>;

  const app = apps.find((item) => Number(item.id) === Number(id));

  if (!app) {
    return (
      <div className="text-center py-10">
        <img className="w-64 h-64 mx-auto" src={appError} alt="App Not Found" />
        <h1 className="text-4xl font-bold py-3">OPPS!! APP NOT FOUND</h1>
        <p className="text-gray-500 py-2">
          The App you are requesting is not found on our system.
        </p>
        <Link to="/apps">
          <button className="btn py-3 px-6 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white mt-4">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  const { downloads, ratingAvg, reviews, size, companyName, title, image } =
    app;

  const handleInstall = () => {
    const installedApps =
      JSON.parse(localStorage.getItem("installation")) || [];

    // Check for duplicate
    const exists = installedApps.some(
      (item) => Number(item.id) === Number(app.id)
    );

    if (exists) {
      toast.error(`"${title}" is already installed!`);
      setIsInstalled(true);
      return;
    }

    installedApps.push(app);
    localStorage.setItem("installation", JSON.stringify(installedApps));
    setIsInstalled(true);

    toast.success(
      `Yahoo !! "${companyName} : ${title}" installed successfully!`
    );
  };

  return (
    <div className="bg-[#f5f5f5]   ">
      <div className="flex flex-col md:flex-row gap-8  max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex-shrink-0">
          <img
            className="w-full md:w-80 h-80 rounded-3xl shadow"
            src={image}
            alt={title}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {companyName} : {title}
            </h2>
            <p className="mb-4">
              Developed by{" "}
              <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">
                productive.io
              </span>
            </p>

            <div className="flex gap-6 mb-6">
              <div>
                <img
                  className="w-5 h-5 mb-1"
                  src={downloadIcon}
                  alt="Downloads"
                />
                <p>Downloads</p>
                <h1 className="font-bold text-2xl">{downloads}</h1>
              </div>
              <div>
                <img className="w-5 h-5 mb-1" src={rating} alt="Rating" />
                <p>Average Ratings</p>
                <h1 className="font-bold text-2xl">{ratingAvg}</h1>
              </div>
              <div>
                <img className="w-5 h-5 mb-1" src={review} alt="Reviews" />
                <p>Total Reviews</p>
                <h1 className="font-bold text-2xl">{reviews}</h1>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleInstall}
              disabled={isInstalled}
              className={`px-6 py-2 rounded text-white font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] ${
                isInstalled
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:opacity-90"
              }`}
            >
              {isInstalled ? "Installed" : `Install Now (${size} MB)`}
            </button>

            <Link to="/apps">
              <button className="px-6 py-2 rounded bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold hover:opacity-90">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default AppsDetails;
