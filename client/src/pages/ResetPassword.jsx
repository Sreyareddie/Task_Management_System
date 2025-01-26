import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { assets } from "../assets/assets";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await API.post(`/user/reset-password/${token}`, {
        newPassword: password,
      });
      setSuccessMessage("Password has been reset successfully!");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error resetting password"
      );
    }
  };

  return (
    <div className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center h-100">
          <div className="col-lg-6">
            <div className="card rounded-3 text-black justify-content-center align-items-center">
              <div className="card-body mx-md-4 my-5">
                <div className="text-center pb-4">
                  <img src={assets.logo} height="90" />
                </div>

                <form onSubmit={handleSubmit}>
                  <p>Reset your password</p>

                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-success">{successMessage}</p>
                  )}

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      placeholder="New Password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-danger btn-block fa-lg gradient-custom-2 mb-3"
                      type="submit"
                    >
                      Reset Password
                    </button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Remember your password?</p>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="btn btn-outline-danger"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
