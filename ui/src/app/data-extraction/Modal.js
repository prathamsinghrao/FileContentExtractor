"use client";

import React, { useState } from "react";

const Modal = ({ isOpen, closeModal, handleFormSubmit }) => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !key || !type || !description || !example) {
      setError("All fields are required!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", key);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("example", example);

      // API call
      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Call the handler passed in to notify about success
        handleFormSubmit(data);
        closeModal(); // Close the modal after success
      } else {
        setError("Failed to upload. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">New Extraction</h2>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* File Upload */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload File
            </label>
            <input
              type="file"
              id="file"
              className="mt-1 block w-full"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Form Fields */}
          <div className="mb-4">
            <label
              htmlFor="key"
              className="block text-sm font-medium text-gray-700"
            >
              Key
            </label>
            <input
              type="text"
              id="key"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="example"
              className="block text-sm font-medium text-gray-700"
            >
              Example
            </label>
            <input
              type="text"
              id="example"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
