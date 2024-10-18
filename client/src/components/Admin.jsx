import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNav";
import axios from "axios";

const Admin = () => {
  const [rentedCars, setRentedCars] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("tk");
    const role = sessionStorage.getItem("role");

    if (!token) {
      window.location.href = "/login";
    }

    if (role == "customer") {
      window.location.href = "/";
    }

    console.log(token);
    if (token) {
      axios
        .get("http://localhost:5555/rentals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRentedCars(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.location.href = "/login";
    }
  }, []);

  function dateDifference(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const timeDifference = endDate - startDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference;
  }

  return (
    <div className="min-h-screen p-10">
      <div class="w-full flex justify-start items-center mb-3 mt-1 pl-3">
        <div>
          <h3 class="text-lg font-semibold text-slate-800">Rented Cars</h3>
        </div>
      </div>

      <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr class="border-b border-slate-300 bg-slate-50">
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                Thumbnail
              </th>
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                Vehicle
              </th>
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                Customer
              </th>
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                Total Days Booked
              </th>
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                Total Price
              </th>
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                Booking Date
              </th>
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                Start Date
              </th>
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                End Date
              </th>
              <th class="p-4 text-sm font-normal leading-none text-slate-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rentedCars.length > 0 ? (
              rentedCars.map(
                (car) => (
                  console.log(car.car.image_url),
                  (
                    <tr class="hover:bg-slate-50">
                      <td class="p-4 border-b border-slate-200 py-5">
                        <p class="block font-semibold text-sm text-slate-800">
                          <img
                            src={car.car.image_url}
                            alt="Product 1"
                            class="w-16 h-16 object-cover rounded"
                          />
                        </p>
                      </td>

                      <td class="p-4 border-b border-slate-200 py-5">
                        <p class="block font-semibold text-sm text-slate-800">
                          {car.car.brand + " " + car.car.model}{" "}
                        </p>
                      </td>

                      <td class="p-4 border-b border-slate-200 py-5">
                        {car.customer ? (
                          <p class="block font-semibold text-sm text-slate-800">
                            {car.customer.name}
                          </p>
                        ) : (
                          ""
                        )}
                      </td>

                      <td class="p-4 border-b border-slate-200 py-5">
                        <p class="block font-semibold text-sm text-slate-800">
                          {dateDifference(car.start_date, car.end_date)}
                        </p>
                      </td>

                      <td class="p-4 border-b border-slate-200 py-5">
                        <p class="block font-semibold text-sm text-slate-800">
                          {car.total_price}
                        </p>
                      </td>

                      <td class="p-4 border-b border-slate-200 py-5">
                        <p class="block font-semibold text-sm text-slate-800">
                          {car.booking_date}
                        </p>
                      </td>

                      <td class="p-4 border-b border-slate-200 py-5">
                        <p class="block font-semibold text-sm text-slate-800">
                          {car.start_date}
                        </p>
                      </td>

                      <td class="p-4 border-b border-slate-200 py-5">
                        <p class="block font-semibold text-sm text-slate-800">
                          {car.end_date}
                        </p>
                      </td>

                      <td class="p-4 border-b border-slate-200 py-5">
                        <div className="flex justify-center items-center">
                          <div>
                            <button
                              class="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                              type="button"
                            >
                              Edit
                            </button>
                          </div>

                          <div>
                            <button
                              class="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )
            ) : (
              <option>No rented cars available</option>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
