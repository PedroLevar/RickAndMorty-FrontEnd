import React from "react";
import "./style.css";
import logoLoading from "../../assets/loadingimage.png"

const LoadingPage: React.FC = () => {
  return (
    <div className="containerLoading">
      <img src={logoLoading} alt="loading" className="logoLoading" />
      <p className="load-text">Loading</p>
    </div>
  );
};

export default LoadingPage;