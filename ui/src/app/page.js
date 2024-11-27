"use client";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-blue-200 min-h-screen">
      <header className="flex items-center justify-between py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Welcome to Data Extraction Tool
        </h1>
        <div>
          <button
            onClick={() => router.push("/data-extraction")}
            className="px-6 py-3 text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-500 transition duration-300"
          >
            Start Extraction
          </button>
        </div>
      </header>

      <section className="text-center mt-10 mx-4 sm:mx-10">
        <h2 className="text-3xl font-semibold text-gray-900">
          Unlock the Power of Document Extraction
        </h2>
        <p className="mt-2 text-xl text-gray-600">
          Effortlessly extract valuable data from multiple documents. Streamline
          your workflow with this powerful tool.
        </p>
        <div className="mt-6 flex justify-center gap-6">
          <div className="flex items-center justify-center p-4 bg-white shadow-xl rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Fast & Efficient
              </h3>
              <p className="text-gray-600">
                Extract data in no time with minimal setup.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-white shadow-xl rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Flexible Formats
              </h3>
              <p className="text-gray-600">
                Supports various document formats for extraction.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-white shadow-xl rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your data is handled securely and privately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600">
            The process is simple. Upload your documents, define extraction
            fields, and let the tool handle the rest.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-indigo-600 p-6 rounded-lg text-white">
            <h3 className="text-2xl font-semibold">Step 1: Upload Documents</h3>
            <p className="mt-2">
              Select and upload the files you want to extract data from.
            </p>
          </div>
          <div className="bg-green-600 p-6 rounded-lg text-white">
            <h3 className="text-2xl font-semibold">
              Step 2: Define Extraction Fields
            </h3>
            <p className="mt-2">
              Specify the keys, types, and descriptions for extraction.
            </p>
          </div>
          <div className="bg-blue-600 p-6 rounded-lg text-white">
            <h3 className="text-2xl font-semibold">Step 3: Extract & View</h3>
            <p className="mt-2">
              Click 'Upload' to extract data and view the results instantly.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 bg-gradient-to-r from-indigo-100 to-blue-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="mt-2 text-xl text-gray-600">
            Begin your data extraction journey now by uploading your first
            document.
          </p>
          <button
            onClick={() => router.push("/data-extraction")}
            className="mt-6 px-8 py-4 text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-500 transition duration-300"
          >
            Start Extraction Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
