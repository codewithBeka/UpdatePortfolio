import React from "react";
import { Loader } from "lucide-react"; // Import the Loader icon

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <Loader className="animate-spin text-purple text-6xl mb-4" />
      <p className="text-xl text-purple">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
