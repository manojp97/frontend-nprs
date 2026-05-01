import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getHistory } from "../services/api";

// Dynamic Image URL
const IMAGE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/uploads/"
    : "https://backend-nprs.onrender.com/uploads/";

const HistoryPage = () => {
  const [data, setData] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
      
      <Navbar />

      <div className="pt-24 px-4 max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8 text-red-500">
          History
        </h1>

        {/* Empty State */}
        {data.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No history found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.map((item, i) => (
              <div
                key={i}
                className="bg-black border border-red-500 p-4 rounded-2xl shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:scale-105 transition-all duration-300"
              >

                {/* Plate Number */}
                <p className="text-xl font-bold text-red-400 tracking-widest text-center">
                  {item.plateNumber}
                </p>

                {/* Image */}
                <img
                  src={IMAGE_URL + item.image}
                  alt="vehicle"
                  className="w-full h-40 object-cover rounded-xl mt-4 border border-red-400"
                />

                {/* Date */}
                <p className="text-xs text-gray-400 mt-3 text-center">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default HistoryPage;