import { useState } from "react";
import { uploadImage } from "../services/api";

const UploadForm = ({ setResult, fetchHistory }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    try {
      if (!file) return alert("Please select image");

      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await uploadImage(formData);

      setResult(res.data.plate || "No Plate Found");

      if (fetchHistory) fetchHistory();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full max-w-lg bg-black border border-red-500 p-8 rounded-3xl text-center shadow-lg">

      {/* Upload Box */}
      <label className="cursor-pointer block border-2 border-dashed border-red-500 rounded-2xl p-10 hover:bg-red-900/20 transition">

        <p className="text-white text-lg font-semibold">
          Click to Upload Image
        </p>

        <p className="text-gray-400 text-sm mt-2">
          Camera / Gallery / Files
        </p>

        {/* Camera + Gallery Choose Option */}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* Preview */}
      {preview && (
        <div className="mt-5">
          <img
            src={preview}
            alt="preview"
            className="w-full h-52 object-cover rounded-xl border border-red-500"
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>

    </div>
  );
};

export default UploadForm;