import { useState } from "react";
import NavLogo from "../../assets/nav-logo.png";
import { Link } from "react-router-dom";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white dark:bg-[#FFA500] fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={NavLogo} alt="Logo" className="h-12" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">BlockVoter</span>
                </a>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-10">
                    <button type="button" className="font-bold text-black border-[2px] border-white bg-[#FFA500] hover:bg-[#e59400] focus:ring-4 focus:outline-none focus:ring-[#FFA500] rounded-lg text-sm px-4 py-2 text-center">
                        <Link to="/adminLogin">Admin</Link>
                    </button>
                    <button type="button" className="font-bold text-black border-[2px] border-white bg-[#FFA500] hover:bg-[#e59400] focus:ring-4 focus:outline-none focus:ring-[#FFA500] rounded-lg text-sm px-4 py-2 text-center">
                        <Link to="/voterLogin">Voter Login</Link>
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`${isMenuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li>
                            <Link to="/home" className="block py-2 px-3 font-bold text-white rounded bg-orange hover:bg-[#FFA500] hover:text-black md:p-0 dark:text-black dark:hover:bg-[#e59400] dark:hover:text-black" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="block py-2 px-3 font-bold text-white rounded bg-orange hover:bg-[#FFA500] hover:text-black md:p-0 dark:text-black dark:hover:bg-[#e59400] dark:hover:text-black" aria-current="page">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="block py-2 px-3 font-bold text-white rounded bg-orange hover:bg-[#FFA500] hover:text-black md:p-0 dark:text-black dark:hover:bg-[#e59400] dark:hover:text-black" aria-current="page">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
