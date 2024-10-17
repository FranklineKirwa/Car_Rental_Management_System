import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RentCar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { car } = location.state || {};
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = year + "-" + month + "-" + date;

  const rentCarNow = () => {
    if (pickupDate != "") {
      if (returnDate != "") {
        console.log({ pickupDate, returnDate });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            isAccepted: true,
          },
        };
        const url = "http://127.0.0.1:5555/rentals";
        const data = {
          start_date: pickupDate,
          end_date: returnDate,
          total_price:
            dateDifference(pickupDate, returnDate) * car.price_per_day,
          status: "booked",
          booking_date: currentDate,
          customer_id: 1,
          car_id: car.id,
        };
        console.log(data);
        axios
          .post(url, data, config)
          .then(function (response) {
            console.log("Response data:", response.data);
            sessionStorage.setItem(
              "message",
              `You have succesfully rented the ${
                car.model + car.brand
              } for ${dateDifference(pickupDate, returnDate)} days`
            );
            window.location.href = "/";
          })
          .catch(function (error) {
            console.error(
              "Error:",
              error.response ? error.response.data : error.message
            );
          });
      } else {
        Swal.fire({
          title: "Error!",
          text: `Please input a end date`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: `Please input an start date`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  function dateDifference(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const timeDifference = endDate - startDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference;
  }

  console.log(car);
  return (
    <div className="min-h-screen lg:flex lg:justify-center">
      <div className="flex flex-col items-center  lg:flex-row lg:items-start m-12 space-y-8 lg:space-y-0 lg:space-x-12">
        <div className="space-y-6 text-start">
          {car ? (
            <div>
              <ul className="text-lg space-y-5">
                <li className="text-gray-600">
                  Brand:{" "}
                  <span className="font-bold text-md text-black">
                    {" "}
                    {car.brand}
                  </span>
                </li>
                <li className="text-gray-600">
                  Model:{" "}
                  <span className="font-bold text-md text-black">
                    {" "}
                    {car.model}
                  </span>
                </li>
                <li className="text-gray-600">
                  Year:{" "}
                  <span className="font-bold text-md text-black">
                    {" "}
                    {car.year}
                  </span>
                </li>
                <li className="text-gray-600">
                  Color:{" "}
                  <span className="font-bold text-md text-black">
                    {" "}
                    {car.color}
                  </span>
                </li>
              </ul>
              <p className="mt-5 text-2xl text-red-400">
                Ksh {car.price_per_day}
              </p>
              {car.availability_status ? (
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  className="mt-5 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  type="button"
                >
                  Rent now
                </button>
              ) : (
                <div className="mt-5">
                  <p>
                    This car is currently unavailable till{" "}
                    {car.rentals[0].end_date}
                  </p>

                  <button
                    data-modal-target="popup-modal"
                    data-modal-toggle="popup-modal"
                    class="mt-5 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    type="button"
                  >
                    Proceed anyway
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div
          id="popup-modal"
          tabindex="-1"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5">
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

            <div>
              <p>
                Total cost:{" "}
                {dateDifference(pickupDate, returnDate) * car.price_per_day}
              </p>
            </div>
            <button
              onClick={rentCarNow}
              type="submit"
              className="w-full mt-2 bg-red-500 text-white py-2.5 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="w-fit">
          <img
            src={car.full_image_url}
            alt="Range"
            className="w-[100vh] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default RentCar;
