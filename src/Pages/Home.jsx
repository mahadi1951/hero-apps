import React from "react";

import { Link } from "react-router-dom";
import AppsCard from "../Components/AppsCard";
import play from "../assets/playstore.png";
import appstore from "../assets/appstore.png";
import hero from "../assets/hero.png";
import useApps from "../Hooks/useApps";
import logo from "../assets/logo.png";

const Home = () => {
  // const apps = useLoaderData();
  const { apps, loading, error } = useApps();
  if (loading)
    return (
      <div className="flex justify-center items-center h-[400px] bg-gray-100">
        <img className="w-60 h-60 animate-spin" src={logo} alt="" />
      </div>
    );
  if (error) return <p>{error}</p>;
  const featureApps = apps.slice(0, 8);
  return (
    <div className="bg-[#f5f5f5]">
      <div className="text-center content-center py-4">
        <h1 className="text-4xl font-bold">
          We Build <br />
          <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-transparent bg-clip-text py-4">
            Productive
          </span>{" "}
          Apps
        </h1>
        <p className="py-4 text-gray-500">
          At HERO.IO , we craft innovative apps designed to make everyday life
          simpler, smarter, and more exciting. <br />
          Our goal is to turn your ideas into digital experiences that truly
          make an impact.
        </p>
        <div className="mb-4 flex-1 gap-3">
          <button
            onClick={() =>
              window.open("https://play.google.com/store/games?hl=en")
            }
            className="btn "
          >
            <img className="w-8 h-8 " src={play} alt="" />
            <p>Google Play</p>
          </button>
          <button
            onClick={() => window.open("https://www.apple.com/app-store/")}
            className="btn "
          >
            <img className="w-8 h-8" src={appstore} alt="" />
            <p>App Store</p>
          </button>
        </div>
        <div>
          <img className="w-[600px] h-80 block mx-auto  " src={hero} alt="" />
        </div>
        <div className="text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-full py-6">
          <h1 className="py-3  text-2xl font-bold">
            Trusted by Millions, Built for You
          </h1>
          <div className="flex justify-around ">
            <div>
              <p className="py-3">Total Downloads</p>
              <h1 className="text-4xl font-bold">29.6M</h1>
              <p className="py-3">21% more than last month</p>
            </div>
            <div>
              <p className="py-3">Total Reviews</p>
              <h1 className="text-4xl font-bold">906K</h1>
              <p className="py-3">46% more than last month</p>
            </div>
            <div>
              <p className="py-3">Active Apps</p>
              <h1 className="text-4xl font-bold">132+</h1>
              <p className="py-3">31 more will Launch</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-7">
        <h1 className="font-bold text-3xl py-3 text-g">Trending Apps</h1>
        <p className="py-1 text-gray-500">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>
      <div className="py-2 text-end">
        <Link className="btn btn-outline " to={"/apps"}>
          See All Apps
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {featureApps.map((app) => (
          <AppsCard key={app} app={app}></AppsCard>
        ))}
      </div>
      <div className="py-2 text-end">
        <Link className="btn btn-outline " to={"/apps"}>
          See All Apps
        </Link>
      </div>
    </div>
  );
};

export default Home;
