import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Grain from "./effects/Grain";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <Grain />
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export default Layout;
