"use client";
import { useRef, useState } from "react";

const DataExtraction = () => {
  const fileInputRef = useRef(null); // Ref for file input
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  // Fields state to hold user keys and form details
  const [fields, setFields] = useState([
    { key: "", type: "string", description: "", example: "" },
  ]);

  // Handle input changes for each dynamic field
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    newFields[index][name] = value;
    setFields(newFields);
  };

  // Handle adding a new field
  const handleAddField = () => {
    setFields([
      ...fields,
      { key: "", type: "string", description: "", example: "" },
    ]);
  };

  // Handle removing a field
  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    setResponse(""); // Clear the previous response
    setFiles(selectedFiles); // Update the files state with the selected files
  };

  // Handle file upload and sending the form data (both files and user keys)
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }
    setLoading(true);

    // Create a FormData object to append both files and form fields
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("userKeys", JSON.stringify(fields));

    try {
      const response = await fetch(
        "https://localhost:44348/api/ExtractionHandlerControlller/extract-content",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json", // Expect JSON response
          },
        }
      );

      const data = await response.json();

      if (data?.data?.length > 0) {
        const output = `
          <div class="alert alert-success">Content extracted successfully!</div>
          <ul class="list-group mt-3">
            ${data.data
              .map(
                (fileInfo, index) => `  
              <li class="list-group-item p-5">
                <h5><b>${fileInfo.fileName} (Page ${
                  fileInfo.pageNumber
                })</b></h5>
                <pre class="whitespace-pre-wrap break-words">${
                  fileInfo.content
                }</pre>
              </li>
              ${
                index < data.data.length - 1
                  ? '<li class="list-group-item"><hr /></li>'
                  : ""
              }
            `
              )
              .join("")}
          </ul>
        `;
        setResponse(output);
      } else {
        setResponse(
          '<div class="alert alert-warning">No content extracted from the files.</div>'
        );
      }
    } catch (error) {
      setResponse(
        `<div class="alert alert-danger">Error uploading files: ${error.message}</div>`
      );
    } finally {
      setLoading(false);
      setFiles([]);
    }
  };

  // Handle clearing form and resetting state for a new extraction
  const handleNewExtraction = () => {
    // Clear response and reset the fields
    setResponse("");
    setFiles([]); // Reset files when starting fresh
    setFields([{ key: "", type: "string", description: "", example: "" }]);
    fileInputRef.current.value = ""; // Clear the file input value
    fileInputRef.current.click();
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-start">
        <header className="px-3">
          <h1 className="text-4xl font-bold text-gray-900">Data Extraction</h1>
          <p className="text-md mt-1 text-gray-500">
            Upload multiple documents to extract data from them.
          </p>
        </header>
        <div className="w-full mt-10 px-3">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-base font-semibold leading-6 text-gray-900">
                Extractions
              </h2>
              <p className="mt-1 text-sm text-gray-700">
                A list of all the extractions that have been uploaded.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={handleNewExtraction} // Reset everything for new extraction
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                + New extraction
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the file input
                multiple
              />
              <button
                onClick={handleUpload}
                className="ml-4 inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                disabled={loading || files.length === 0}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="mt-6 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <div className="mt-4 flex flex-col items-center justify-center p-1">
              {loading && <div id="loader">Loading...</div>}
              <div
                id="response"
                className="w-full overflow-auto"
                dangerouslySetInnerHTML={{ __html: response }}
              />
              {!loading && !response && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900">
                    No extractions yet
                  </h2>
                  <p className="mt-1.5 text-sm text-gray-600">
                    Get started by creating a new extraction.
                  </p>
                </>
              )}
            </div>
            <div className="mt-4 p-2">
              {files.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-col items-center justify-center p-2">
                    <h3 className="text-md font-semibold">Selected Files:</h3>
                  </div>
                  <ul className="list-disc list-inside mt-2">
                    {files.map((file) => (
                      <li key={file.name} className="text-gray-700">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <h6 className="text-md font-semibold text-gray-900">
                      Provide extraction details about the form
                    </h6>

                    {fields.map((field, index) => (
                      <div key={index} className="space-y-4">
                        {/* Key Input */}
                        <div>
                          <label
                            htmlFor={`key-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Key
                          </label>
                          <input
                            id={`key-${index}`}
                            type="text"
                            name="key"
                            value={field.key}
                            onChange={(e) => handleChange(index, e)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Add key"
                            required
                          />
                        </div>

                        {/* Type Dropdown */}
                        <div>
                          <label
                            htmlFor={`type-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Type
                          </label>
                          <select
                            id={`type-${index}`}
                            name="type"
                            value={field.type}
                            onChange={(e) => handleChange(index, e)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="string">String</option>
                            <option value="integer">Integer</option>
                          </select>
                        </div>

                        {/* Description Input */}
                        <div>
                          <label
                            htmlFor={`description-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <input
                            id={`description-${index}`}
                            type="text"
                            name="description"
                            value={field.description}
                            onChange={(e) => handleChange(index, e)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Optional: Add description"
                          />
                        </div>

                        {/* Example Input */}
                        <div>
                          <label
                            htmlFor={`example-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Example
                          </label>
                          <input
                            id={`example-${index}`}
                            type="text"
                            name="example"
                            value={field.example}
                            onChange={(e) => handleChange(index, e)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Optional: Add example"
                          />
                        </div>

                        <div className="flex justify-end mt-2">
                          {fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveField(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              - Remove Field
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Add New Field Button */}
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={handleAddField}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Add New Field
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExtraction;
