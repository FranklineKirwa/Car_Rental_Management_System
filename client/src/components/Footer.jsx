import React from "react";
import Logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer class="w-full bg-white p-8">
            <div class="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <img src={Logo} alt="logo" className="h-12"></img>

                <ul class="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <a
                            href="#"
                            class="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
                        >
                            Rentals
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
                        >
                            Contact Us
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            class="text-slate-700 hover:text-slate-500 focus:text-slate-500 text-sm"
                        >
                            Login
                        </a>
                    </li>
                   
                </ul>
            </div>
            <p class="block mb-4 text-sm text-center text-slate-500 md:mb-0 border-t border-slate-200 mt-4 pt-4">
                Copyright © 2024&nbsp;
                <a href="#" target="_blank" rel="noreferrer">Car Rental</a>.
            </p>
        </footer>
    );
}

export default Footer;