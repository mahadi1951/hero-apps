import React from "react";
import logo from "../assets/logo.png";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-64 bg-gray-100">
      <img className="w-32 h-32 animate-spin" src={logo} alt="" />
    </div>
  );
};

export default Loading;
