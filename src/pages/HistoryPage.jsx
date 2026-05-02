import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getHistory, deleteHistory } from "../services/api";

const IMAGE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/uploads/"
    : "https://backend-nprs.onrender.com/uploads/";

const HistoryPage = () => {
  const [data, setData] = useState([]);

  const fetchHistory = async () => {
    const res = await getHistory();
    setData(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    await deleteHistory(id);
    fetchHistory();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-24 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl text-center text-red-500 mb-8">
          History
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900 p-4 rounded-xl border border-red-500"
            >
              <img
                src={IMAGE_URL + item.image}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="mt-3 text-xl text-red-400">
                {item.plateNumber}
              </h2>

              <p className="text-sm text-gray-400">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-4 w-full bg-red-600 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;