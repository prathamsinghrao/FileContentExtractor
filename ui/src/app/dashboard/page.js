"use client";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Dashboard</h1>
      <p className="text-md text-gray-500 mb-10">
        Monitor the performance and key metrics of the application.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Total Extractions
          </h3>
          <p className="text-lg text-indigo-600 mt-2">234</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Successful Operations
          </h3>
          <p className="text-lg text-green-600 mt-2">210</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Failed Operations
          </h3>
          <p className="text-lg text-red-600 mt-2">24</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
