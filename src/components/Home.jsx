import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen m-4 flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to My Juicer App</h1>
      <Link to="/recipes" className="mt-4 text-blue-500 hover:underline">
        Go to Recipes
      </Link>
    </div>
  );
};

export default Home;
