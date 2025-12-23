import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto  navbar bg-base-100 -px-34 gap-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Link to={"/"}>Home</Link>
            <Link to={"/apps"}>Apps</Link>
            <Link to={"/installation"}>Installation</Link>
          </ul>
        </div>
        <Link className="" to={"/"}>
          <div className="flex-1 flex items-center gap-3">
            <img className="w-8 text-center" src={logo} alt="" />

            <span className="font-bold text-xl bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text">
              HERO.IO
            </span>
          </div>
        </Link>
      </div>

      <div className=" navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal gap-5 font-semibold">
          <Link className="text-sm font-medium hover:text-[#632EE3]" to={"/"}>
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#632EE3]"
            to={"/apps"}
          >
            Apps
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#632EE3]"
            to={"/installation"}
          >
            Installation
          </Link>
        </ul>
      </div>

      <div className="  lg:navbar-end md:navbar-end">
        <button
          onClick={() =>
            window.open("https://github.com/mahadi1951?tab=repositories")
          }
          className=" btn flex bg-linear-to-r from-[#632EE3] to-[#9F62F2]  text-white"
        >
          <svg
            aria-label="GitHub logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
            ></path>
          </svg>
          Contribute
        </button>
      </div>
    </div>
  );
};

export default Navbar;
