import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [carData, setCarData] = useState("");
  const [carModels, setcarModel] = useState("");
  const [model, setModel] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5555/cars")
      .then((response) => {
        setCarData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ model, pickupDate, returnDate });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book a car</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Car Model <span className="text-red-500">*</span>
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option disabled value="">
              Select model
            </option>
            {carData.length > 0 ? (
              carData.map((car) => (
                <option key={car.model} value={car.model}>
                  {car.model}
                </option>
              ))
            ) : (
              <option>No vehicles available</option>
            )}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pick-up Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-red-500 text-white py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
