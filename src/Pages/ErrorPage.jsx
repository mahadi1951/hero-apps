import React from "react";
import error from "../assets/error-404.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center">
      <img className="w-[320px] h-[310px] mx-auto py-3" src={error} alt="" />
      <h1 className="font-bold text-4xl py-3 text-g">Oops, page not found!</h1>
      <p className="py-3 text-gray-500">
        The page you are looking for is not available.
      </p>
      <Link to={"/"}>
        <button className="btn py-3 bg-linear-to-r from-[#632EE3] to-[#9F62F2]   text-white">
          Go Back!
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
