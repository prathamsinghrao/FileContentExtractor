"use client";
import { useRef, useState } from "react";

const DataExtraction = () => {
  const fileInputRef = useRef(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [fields, setFields] = useState([
    { key: "", type: "string", description: "", example: "" },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    newFields[index][name] = value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      { key: "", type: "string", description: "", example: "" },
    ]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }
    setResponse("");
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }
    setLoading(true);
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
          headers: { Accept: "application/json" },
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

  const handleNewExtraction = () => {
    setResponse("");
    setFiles([]);
    setFields([{ key: "", type: "string", description: "", example: "" }]);
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-start">
        <header className="text-center w-full mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Data Extraction
          </h1>
          <p className="text-md mt-1 text-gray-500">
            Upload documents and extract data seamlessly.
          </p>
        </header>
        <div className="w-full mt-8 px-4">
          <div className="sm:flex sm:items-center justify-between">
            <div className="sm:flex-auto">
              <h2 className="text-lg font-semibold text-gray-900">
                Upload & Extract Data
              </h2>
              <p className="mt-1 text-sm text-gray-700">
                Manage your extractions and define the fields for data
                extraction.
              </p>
            </div>
            <div className="mt-4 sm:flex-none">
              <button
                onClick={handleNewExtraction}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition duration-300"
              >
                + New Extraction
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                multiple
              />
              <button
                onClick={handleUpload}
                className="ml-4 inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-green-500 focus:outline-none transition duration-300"
                disabled={loading || files.length === 0}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-xl p-6">
            <div className="mt-4 flex justify-center">
              {loading && <div id="loader">Loading...</div>}
              <div
                id="response"
                className="w-full overflow-auto"
                dangerouslySetInnerHTML={{ __html: response }}
              />
              {!loading && !response && (
                <div className="text-center mt-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    No Extractions Yet
                  </h2>
                  <p className="text-sm text-gray-600 mt-1.5">
                    Start a new extraction by uploading your files and defining
                    extraction fields.
                  </p>
                </div>
              )}
            </div>
            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Selected Files:
                </h3>
                <ul className="mt-2 list-disc pl-5">
                  {files.map((file) => (
                    <li key={file.name} className="text-gray-700">
                      {file.name}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <h6 className="text-md font-semibold text-gray-900">
                    Define Extraction Fields
                  </h6>
                  {fields.map((field, index) => (
                    <div key={index} className="space-y-6 mb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
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
                      </div>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveField(index)}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Remove this field
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    + Add Field
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExtraction;
