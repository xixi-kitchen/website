import React from "react";

/** 固定在视口上的胶片颗粒，不拦截点击 */
const Grain: React.FC = () => (
  <div className="grain-overlay" aria-hidden />
);

export default Grain;
