import Range from "../assets/range.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedMessage = sessionStorage.getItem("message");
    if (storedMessage) {
      setMessage(storedMessage);
      sessionStorage.removeItem("message");
    }
  }, []);

  return (
    <div>
      {message && (
        <div
          className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start m-12 space-y-8 lg:space-y-0 lg:space-x-12">
        <div className="space-y-6 text-center lg:text-left">
          <p className="text-gray-800 font-medium">Ready when you are</p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Drive <span className="text-red-500">premium</span>
            <br />
            pay less
          </h1>

          <p className="text-gray-600 max-w-md mx-auto lg:mx-0">
            Choose from our fleet of quality vehicles. No hidden fees, unlimited
            miles, and 24/7 roadside assistance included.
          </p>

          <div className="flex justify-center lg:justify-start flex-wrap gap-4">
            <Link to="/about-us">
              <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Find Out More
              </button>
            </Link>
            <Link to="/rentals">
              <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                View Fleet
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <img
            src={Range}
            alt="Range"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
