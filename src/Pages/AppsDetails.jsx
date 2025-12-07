import React from "react";
import { Link, useParams } from "react-router-dom";
import useApps from "../Hooks/useApps";
import appError from "../assets/App-Error.png";
import downloadIcon from "../assets/icon-downloads.png";
import rating from "../assets/icon-ratings.png";
import review from "../assets/icon-review.png";

const AppsDetails = () => {
  const { id } = useParams();
  const { apps, loading, error } = useApps();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product data</p>;

  const app = apps.find((item) => item.id == parseInt(id));
  if (!app) {
    return (
      <div className="text-center">
        <img
          className="w-[320px] h-[310px] mx-auto py-3"
          src={appError}
          alt=""
        />
        <h1 className="font-bold text-4xl py-3 text-g">OPPS!! APP NOT FOUND</h1>
        <p className="py-3 text-gray-500">
          The App you are requesting is not found on our system. please try
          another apps
        </p>
        <Link to={"/apps"}>
          <button className="btn py-3 bg-gradient-to-r from-[#632EE3] to-[#9F62F2]   text-white">
            Go Back!
          </button>
        </Link>
      </div>
    );
  }

  const {
    downloads,
    ratingAvg,

    reviews,
    size,

    companyName,
    title,
    image,
  } = app;

  const handleAddToInstallNow = () => {
    const existingList = JSON.parse(localStorage.getItem("installation"));
    let updateList = [];
    if (existingList) {
      const isDuplicate = existingList.some((p) => p.id === app.id);
      if (isDuplicate) return alert(" This items Already added");
      updateList = [...existingList, app];
    } else {
      updateList.push(app);
    }
    localStorage.setItem("installation", JSON.stringify(updateList));
  };

  return (
    <div className="bg-[#f5f5f5]">
      <div className="flex  gap-15 py-5 my-3  rounded-2xl">
        <div className="px-4">
          <img
            className="w-[400px] h-[400px] rounded-2xl  shadow ml-4"
            src={image}
            alt=""
          />
        </div>
        <div className=" content-center">
          <h2 className="font-bold text-3xl">
            {companyName} : {title}
          </h2>
          <p>
            Developed by{" "}
            <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">
              productive.io
            </span>
          </p>
          <div className="flex gap-4 py-8">
            <div className="">
              <img className="w-5 h-5" src={downloadIcon} alt="" />
              <p>Downloads</p>
              <h1 className="font-bold text-4xl">{downloads}</h1>
            </div>
            <div className="">
              <img className="w-5 h-5" src={rating} alt="" />
              <p>Average Ratings</p>
              <h1 className="font-bold text-4xl">{ratingAvg}</h1>
            </div>
            <div className="">
              <img className="w-5 h-5" src={review} alt="" />
              <p>Total Reviews</p>
              <h1 className="font-bold text-4xl">{reviews}</h1>
            </div>
          </div>

          <div className="card-actions  ">
            <button
              onClick={handleAddToInstallNow}
              className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white border-0"
            >
              Install Now ({size} MB)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppsDetails;
