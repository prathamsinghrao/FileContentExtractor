"use client";

const History = () => {
  const historyData = [
    { date: "2024-11-20", status: "Success", file: "document1.pdf" },
    { date: "2024-11-18", status: "Failed", file: "document2.pdf" },
    { date: "2024-11-15", status: "Success", file: "document3.pdf" },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">History</h1>
      <p className="text-md text-gray-500 mb-10">
        View the log of past extractions and their statuses.
      </p>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">File</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-3">{item.date}</td>
                <td className="px-6 py-3">{item.file}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Success"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
