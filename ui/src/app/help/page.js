"use client";

const Help = () => {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Help & Documentation
      </h1>
      <p className="text-md text-gray-500 mb-10">
        Find answers to your questions and resources to help you use the app
        effectively.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            How to Use the App
          </h2>
          <p className="text-sm text-gray-600">
            Learn how to upload documents, define extraction fields, and view
            the results. Follow these steps to get started with your first
            extraction.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Frequently Asked Questions
          </h2>
          <ul className="list-disc pl-5">
            <li>How do I upload a file?</li>
            <li>What file formats are supported?</li>
            <li>How can I define custom extraction fields?</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Contact Support
          </h2>
          <p className="text-sm text-gray-600">
            If you need further assistance, please contact our support team at
            prathamsingh.rao@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
