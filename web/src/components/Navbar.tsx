import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex-shrink-0 flex items-center text-xl font-bold text-gray-900 dark:text-white">
                MyPortfolio
              </a>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/">
                <a className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">
                  首页
                </a>
              </Link>
              <Link href="/about">
                <a className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">
                  关于
                </a>
              </Link>
              <Link href="/projects">
                <a className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">
                  项目
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium">
                  联系
                </a>
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
            <Link href="/">
              <a className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium">
                首页
              </a>
            </Link>
            <Link href="/about">
              <a className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium">
                关于
              </a>
            </Link>
            <Link href="/projects">
              <a className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium">
                项目
              </a>
            </Link>
            <Link href="/contact">
              <a className="block text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium">
                联系
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;