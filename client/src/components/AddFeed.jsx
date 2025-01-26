import React, { useState } from "react";
import API from "../api";

const AddFeed = ({ showModal, setShowModal, token, onFeedAdded }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ caption: false, image: false });

  const handleUpload = async (e) => {
    e.preventDefault();
    const newErrors = { caption: !caption, image: !image };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      const response = await API.post("/feed/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setCaption("");
        setImage(null);
        setErrors({ caption: false, image: false });
        setShowModal(false);
        onFeedAdded();
      } else {
        alert("Failed to upload feed.");
      }
    } catch (error) {
      console.error("Error uploading feed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Feed Post</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpload}>
              <div className="mb-3">
                <label className="form-label">Caption *</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.caption ? "border-danger" : ""
                  }`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
                {errors.caption && (
                  <small className="text-danger">Required</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Image *</label>
                <input
                  type="file"
                  className={`form-control ${
                    errors.image ? "border-danger" : ""
                  }`}
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  required
                />
                {errors.image && (
                  <small className="text-danger">Required</small>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Create Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFeed;
