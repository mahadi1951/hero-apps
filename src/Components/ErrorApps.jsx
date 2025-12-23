import React from "react";
import appError from "../assets/App-Error.png";
import { Link } from "react-router-dom";

const ErrorApps = () => {
  return (
    <div className="text-center py-10">
      <img
        className="h-56 w-56 lg:w-64 lg:h-64 mx-auto"
        src={appError}
        alt="App Not Found"
      />
      <h1 className="text-3xl lg:text-4xl font-bold py-3">
        OPPS!! APP NOT FOUND
      </h1>
      <p className="text-gray-500 py-2">
        The App you are requesting is not found on our system.
      </p>
      <Link to="/apps">
        <button className="btn py-3 px-6 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white mt-4">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export default ErrorApps;
