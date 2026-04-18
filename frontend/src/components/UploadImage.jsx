import { useState } from "react";
import axios from "axios";

export default function UploadImage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const CLOUD_NAME = "dnzmpmebf";   // 🔁 replace
  const UPLOAD_PRESET = "ecom-preset";    // 🔁 replace

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setLoading(true);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      setImageUrl(res.data.secure_url);
      console.log("Uploaded URL:", res.data.secure_url);

    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test Image Upload</h2>

      {loading ? (
        <p>Uploading...</p>
      ) : (
        <input type="file" accept="image/*" onChange={handleUpload} />
      )}

      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="uploaded" width="200" />
          <p>{imageUrl}</p>
        </div>
      )}
    </div>
  );
}