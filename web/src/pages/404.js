import React from "react";
import dynamic from "next/dynamic";



 const NotFindNet = dynamic(() => import("../components/NotFindNet"), {
  ssr: false,
 });

export default function Custom404() {
  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl font-bold">Page Not Found</p>
      <NotFindNet />
    </div>
  );
}
