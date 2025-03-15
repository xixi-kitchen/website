import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-brightblue shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex justify-between w-full">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex-shrink-0 flex items-center text-xl font-bold text-gray-900 dark:text-white"
            >
              <Image
                className="dark:invert"
                src="/Generated 3D Image.svg"
                alt="首页 logo"
                width={40}
                height={40}
              />
              HUGH·Aix
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8 md:items-center">
              <Link
                href="/ai"
                className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                AI 专刊
              </Link>
              <Link
                href="/experience"
                className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                经历
              </Link>
              <Link
                href="/projects"
                className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                项目
              </Link>
              <Link
                href="/toys"
                className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                小玩意
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                联系
              </Link>
              <Link
                href="/about"
                className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                关于
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/ai"
              onClick={handleLinkClick}
              className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              AI 专刊
            </Link>
            <Link
              href="/experience"
              onClick={handleLinkClick}
              className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              经历
            </Link>
            <Link
              href="/projects"
              onClick={handleLinkClick}
              className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              项目
            </Link>
            <Link
              href="/toys"
              onClick={handleLinkClick}
              className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              小玩意
            </Link>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              联系
            </Link>
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              关于
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
