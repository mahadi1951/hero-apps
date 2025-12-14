import React from "react";
import download from "../assets/icon-downloads.png";
import star from "../assets/icon-ratings.png";
import { Link } from "react-router-dom";

const AppsCard = ({ app }) => {
  const { id, downloads, ratingAvg, companyName, image, title } = app;

  return (
    <Link to={`/apps/${id}`}>
      <div className="card bg-base-100 w-[300px] h-[300px] shadow-sm hover:scale-105 transition ease-in-out  py-3">
        <img
          className="w-52 h-44 text-center mx-auto"
          src={image}
          alt="image"
        />
        <h2 className="font-semibold mx-auto">
          {companyName}-{title}
        </h2>
        <div className="flex justify-between my-5 mx-5">
          <div className="flex gap-2 items-center bg-[#f1f5e8] px-3 py-1 rounded-2xl">
            <img className="h-4 w-4" src={download} alt="" />
            <p>{downloads}</p>
          </div>
          <div className="flex gap-2 items-center bg-[#fff0e1] px-3 py-1 rounded-2xl">
            <img className="h-4 w-4" src={star} alt="" />
            <p>{ratingAvg}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AppsCard;
