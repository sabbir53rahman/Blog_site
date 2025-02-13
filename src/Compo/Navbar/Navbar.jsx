"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import useAuth from "@/firebase/useAuth";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut  } = useAuth(); // Get the logOut function from useAuth hook
  const user = useSelector(state => state.user.currentUser)

  console.log(user); // Log the current user to see the data

  // Function to toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Function to handle logout
  const handleLogout = () => {
    logOut().then(() => console.log("User logged out"));
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          My Blog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/create-blog" className="hover:text-gray-300">
            Create Blog
          </Link>
          <Link href="/all-blogs" className="hover:text-gray-300">
            All Blogs
          </Link>
          {user?.role === "admin" && (
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          )}
        </div>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 flex flex-col items-center">
          <Link
            href="/create-blog"
            className="hover:text-gray-300"
            onClick={toggleMenu}
          >
            Create Blog
          </Link>
          <Link
            href="/all-blogs"
            className="hover:text-gray-300"
            onClick={toggleMenu}
          >
            All Blogs
          </Link>
          {user?.role === "admin" && (
            <Link
              href="/dashboard"
              className="hover:text-gray-300"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
