import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { assets } from "../assets/assets";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await API.post("/user/forgot-password", { email });
      setSuccessMessage("Password reset link sent to your email!");
      setEmail("");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center h-100">
          <div className="col-lg-6">
            <div className="card rounded-3 text-black justify-content-center align-items-center">
              <div className="card-body mx-md-5 my-5">
                <div className="text-center pb-4">
                  <img src={assets.logo} height="90" alt="logo" />
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
                    <label className="form-label" htmlFor="formEmail">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="formEmail"
                      placeholder="Email Address"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-danger btn-block fa-lg gradient-custom-2 mb-3"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Remember your password?</p>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="btn btn-outline-danger"
                      disabled={isLoading}
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

export default ForgotPassword;
