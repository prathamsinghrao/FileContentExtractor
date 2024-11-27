"use client";

const Settings = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-yellow-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Settings</h1>
      <p className="text-md text-gray-500 mb-10">
        Update your preferences and app settings below.
      </p>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            className="h-4 w-4 text-indigo-600"
          />
          <label
            htmlFor="notifications"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Enable notifications
          </label>
        </div>

        <div>
          <button className="mt-4 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition duration-300">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
