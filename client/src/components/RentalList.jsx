import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RentalList = () => {
  const [carData, setCarData] = useState("");
  const navigate = useNavigate();

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

  const rentCar = (car) => {
    navigate("/rent-car", { state: { car } });
  };
  return (
    <div className="min-h-screen">
      {carData.length > 0 ? (
        <div className="p-8 flex space-x-5">
          {carData.map((car) => (
            <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-fit">
              <div class="relative h-fit m-2.5 overflow-hidden text-white rounded-md">
                <img src={car.image_url} alt="card-image" />
              </div>
              <div class="px-4 py-1">
                <h6 class="text-slate-800 text-xl font-semibold">
                  {car.brand} {car.model}
                </h6>
              </div>
              <div class="px-4 py-1">
                <h6 class="text-slate-800 text-sm">
                  Price per day: Ksh {car.price_per_day}
                </h6>
              </div>
              <div class="px-4 pb-4">
                <button
                  class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit"
                  onClick={() => {
                    rentCar(car);
                  }}
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No rentals available</p>
      )}
    </div>
  );
};

export default RentalList;
