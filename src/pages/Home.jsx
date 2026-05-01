import { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [result, setResult] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
      <Navbar />

      <div className="pt-24 px-4">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-red-500">
          Number Plate Recognition
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 mb-10 text-center max-w-md mx-auto">
          Upload a vehicle image to detect and extract the number plate using AI.
        </p>

        {/* Before Result */}
        {!result ? (
          <div className="flex justify-center">
            <UploadForm
              setResult={setResult}
              fetchHistory={() => {}}
            />
          </div>
        ) : (
          /* After Result */
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start justify-center">

            {/* Upload Left */}
            <div className="w-full md:w-1/2 flex justify-center">
              <UploadForm
                setResult={setResult}
                fetchHistory={() => {}}
              />
            </div>

            {/* Result Right */}
            <div className="w-full md:w-1/2 flex justify-center">
              <ResultCard result={result} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Home;