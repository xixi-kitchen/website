import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-900 dark:text-white text-sm">
          &copy; {new Date().getFullYear()} HUGH·Aix. 版权所有.
        </p>
      </div>
    </footer>
  );
};

export default Footer;