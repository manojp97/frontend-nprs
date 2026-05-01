import { useRef, useState } from "react";
import { uploadImage } from "../services/api";

const UploadForm = ({ setResult, fetchHistory }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // hidden inputs
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

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

      {/* Title */}
      <p className="text-white text-xl font-semibold mb-6">
        Upload Vehicle Image
      </p>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4">

        {/* Gallery */}
        <button
          onClick={() => galleryInputRef.current.click()}
          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        >
          Gallery
        </button>

        {/* Camera */}
        <button
          onClick={() => cameraInputRef.current.click()}
          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        >
          Live Camera
        </button>

      </div>

      {/* Hidden Gallery Input */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* Hidden Camera Input */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="hidden"
      />

      {/* Preview */}
      {preview && (
        <div className="mt-6">
          <img
            src={preview}
            alt="preview"
            className="w-full h-52 object-cover rounded-xl border border-red-500"
          />
        </div>
      )}

      {/* Detect Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition"
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>

    </div>
  );
};

export default UploadForm;