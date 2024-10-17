import React from "react";
import Home from "../assets/home.svg";
import Rentals from "../assets/car.svg";
import Contact from "../assets/contact.svg";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav class="block  px-4 py-2 mx-auto bg-white shadow-md rounded-md lg:px-8 lg:py-3">
      <div class="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
        <div className="flex justify-center items-center">
          <img src={Logo} alt="logo" className="h-12"></img>
          <Link
            to="/"
            class="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
          >
            Admin Dashboard
          </Link>
        </div>

        <div class="hidden lg:block">
          <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <img src={Rentals} alt="logo" className="h-5"></img>
              <Link to="/rentals">Manage Fleet</Link>
            </li>
            <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <img src={Contact} alt="logo" className="h-5"></img>
              <a href="#" class="flex items-center">
                Manage Users
              </a>
            </li>
            <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <button
                class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                type="button"
              >
                Logout
              </button>{" "}
            </li>
          </ul>
        </div>
        <button
          class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
        >
          <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
