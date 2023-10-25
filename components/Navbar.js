import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component from Next.js

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" passHref>
              <div className="flex items-center">
                <Image
                  src="/images/SC1.png" // Replace with your image's path
                  alt="Brand logo"
                  width={40}
                  height={40}
                />
                <span className="text-white text-lg font-semibold ml-2">
                  ShredCaster
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" passHref>
                <div className="text-white">Home</div>
              </Link>
              <Link href="/about" passHref>
                <div className="text-white">About</div>
              </Link>
              <Link href="/contact" passHref>
                <div className="text-white">Contact</div>
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <span>Close</span> : <span>Menu</span>}
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" passHref>
            <div className="text-white">Home</div>
          </Link>
          <Link href="/about" passHref>
            <div className="text-white">About</div>
          </Link>
          <Link href="/contact" passHref>
            <div className="text-white">Contact</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
