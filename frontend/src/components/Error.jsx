import React from "react";

const Error = ({ message }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-red-600 font-semibold text-lg">
      {message || "Something went wrong!"}
    </div>
  </div>
);

export default Error;
