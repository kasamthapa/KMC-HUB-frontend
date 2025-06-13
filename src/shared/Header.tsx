import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { authAtom, authAtomWithStorage } from "../jotai/auth";
import { useAtomValue, useAtom } from "jotai";
import MenuButtonIcon from "../ui/MenuButtonIcon";
import CrossIcon from "../ui/CrossIcon";
import Logo from "../assets/Logo.png";
export const Header = () => {
  const auth = useAtomValue(authAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setAuth] = useAtom(authAtomWithStorage);
  const logout = () => {
    setAuth({ user: null, token: null });
    setIsMenuOpen(false);
  };

  return (
    <header className="h-[72px] w-screen   m-auto py-5 px-[64px] box-border z-30">
      <nav className="flex  justify-between   h-[40px] items-center z-[20]">
        <div>
          <Link to="/">
            <img src={Logo} alt="logo" className="w-[100px] h-[100px]" />
          </Link>
        </div>
        <ul
          className="hidden xl:flex  lg:flex gap-10 
        "
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:text-orange-400 transition duration-300 ${
                  isActive ? "active semi-bold" : "text-gray-800"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:text-orange-400 transition duration-300 ${
                  isActive ? "active semi-bold" : "text-gray-800"
                }`
              }
            >
              Features
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:text-orange-400 transition duration-300 ${
                  isActive ? "active semi-bold" : "text-gray-800"
                }`
              }
            >
              Resources
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/collaboration-feed"
              className={({ isActive }) =>
                `px-2 py-1 rounded hover:text-orange-400 transition duration-300 ${
                  isActive ? "active semi-bold" : "text-gray-800"
                }`
              }
            >
              Feed
            </NavLink>
          </li>
        </ul>
        {auth.token ? (
          <div className="hidden xl:flex lg:flex ">
            <button
              className=" xl:flex  lg:flex w-[71] h-3 bg-black text-white p-4 rounded-md flex justify-center items-center hover:bg-green-800 cursor-pointer transition duration-300 border-none "
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden xl:flex  lg:flex gap-10 justify-center items-center">
            <Link
              to="/login"
              className=" hover:text-orange-400 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className=" hover:bg-green-600 transition duration-300 w-20 h-8 bg-black text-white flex justify-center items-center rounded-md"
            >
              Join
            </Link>
          </div>
        )}
        <div className="xl:hidden lg:hidden block absolute right-[64px] ">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {!isMenuOpen && <MenuButtonIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile view */}
      {isMenuOpen && (
        <div className="xl:hidden lg:hidden md:w-1/3 sm:w-1/3 flex flex-col bg-white shadow-2xl w-2/3   h-full items-center justify-start absolute right-0 top-0 z-[1000] px-4">
          <button
            className="absolute top-4 right-4 "
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <CrossIcon />
          </button>
          <ul
            className=" flex flex-col  gap-10 relative mt-15 w-full pl-8
        "
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-2 py-1 rounded hover:text-orange-400 transition duration-300 ${
                    isActive ? "active semi-bold" : "text-gray-800"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  `px-2 py-1 rounded hover:text-orange-400 transition duration-300 ${
                    isActive ? "active semi-bold" : "text-gray-800"
                  }`
                }
              >
                Features
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  `px-2 py-1 rounded hover:text-orange-400 transition duration-300 ${
                    isActive ? "active semi-bold" : "text-gray-800"
                  }`
                }
              >
                Resources
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/collaboration-feed"
                className={({ isActive }) =>
                  `px-2 py-1 rounded hover:text-orange-400 transition duration-300 ${
                    isActive ? "active semi-bold" : "text-gray-800"
                  }`
                }
              >
                Feed
              </NavLink>
            </li>
          </ul>
          {auth.token ? (
            <button
              className="w-[71] h-3 bg-black text-white p-4 rounded-md flex justify-center items-center hover:bg-green-800 cursor-pointer transition duration-300 border-none mt-5 "
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <div className="flex border-t-1 pt-3 mt-5 w-full  gap-10 justify-center items-center">
              <Link
                to="/login"
                className=" hover:text-orange-400 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className=" hover:bg-green-600 transition duration-300 w-20 h-8 bg-black text-white flex justify-center items-center rounded-md"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
