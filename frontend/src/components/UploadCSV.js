import React, { useState } from "react";
import { uploadCSV } from "../api";
import { toast } from "react-toastify";

function UploadCSV() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file 📄");
      return;
    }

    try {
      setLoading(true);
      const res = await uploadCSV(file);

      if (res.data.errors.length === 0) {
        toast.success(`🎉 Uploaded ${res.data.inserted} users successfully!`);
      } else {
        toast.warn("❌ Upload failed. Please check CSV file!");
      }

    } catch (err) {
      toast.error("❌ Upload failed. Please check CSV file!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>CSV Bulk Upload</h1>

      <label className="upload-box">
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file ? file.name : "📂 Click to select CSV file"}
      </label>

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
    </div>
  );
}

export default UploadCSV;
