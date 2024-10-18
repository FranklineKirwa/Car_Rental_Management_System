import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        isAccepted: true,
      },
    };
    const url = "http://127.0.0.1:5555/login";
    const data = {
      username: username,
      password: password,
    };

    axios
      .post(url, data, config)
      .then(function (response) {
        console.log("Response data:", response.data);
        if (response.data) {
          sessionStorage.setItem("tk", response.data.access_token);
          sessionStorage.setItem("username", response.data.username);
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("id", response.data.id);

          if (response.data.role === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        } else {
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div class="relative flex flex-col rounded-xl bg-transparent">
        <h4 class="block text-xl font-medium text-slate-800">Sign In</h4>
        <p class="text-slate-500 font-light"></p>
        <form
          onSubmit={handleSubmit}
          class="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div class="mb-1 flex flex-col gap-6">
            <div class="w-full max-w-sm min-w-[200px]">
              <label class="block mb-2 text-sm text-slate-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Username"
              />
            </div>
            <div class="w-full max-w-sm min-w-[200px]">
              <label class="block mb-2 text-sm text-slate-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your Password"
              />
            </div>
          </div>
          <div class="inline-flex items-center mt-2">
            <label
              class="flex items-center cursor-pointer relative"
              for="check-2"
            >
              <input
                type="checkbox"
                class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                id="check-2"
              />
              <span class="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              class="cursor-pointer ml-2 text-slate-600 text-sm"
              for="check-2"
            >
              Remember Me
            </label>
          </div>
          <button
            class="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Sign In
          </button>
          <p class="flex justify-center mt-6 text-sm text-slate-600">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              class="mr-4 block cursor-pointer px-2 text-sm text-slate-800 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
