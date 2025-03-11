import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col">
      {/* 固定导航栏在顶部 */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      
      {/* 让 main 组件不被导航栏遮挡 */}
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;