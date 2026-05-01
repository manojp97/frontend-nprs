// UploadForm.jsx (fixed)

import { useState } from "react";
import { uploadImage } from "../services/api";

const UploadForm = ({ setResult, fetchHistory }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
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
    <div className="mt-8 w-full max-w-lg bg-black border border-red-500 p-8 rounded-3xl text-center">

      <label className="cursor-pointer block border-2 border-dashed border-red-500 rounded-2xl p-10">

        <p className="text-white">Click to Upload Image</p>

        <input
          type="file"
          onChange={handleChange}
          className="hidden"
          accept="image/*"
        />
      </label>

      {preview && (
        <img
          src={preview}
          className="mt-4 w-full h-48 object-cover rounded-xl"
        />
      )}

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl"
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>
    </div>
  );
};

export default UploadForm;