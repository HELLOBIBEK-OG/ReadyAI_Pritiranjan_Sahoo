import React from "react";
import UploadCSV from "./components/UploadCSV";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function App() {
  return (
    <>
      <UploadCSV />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
