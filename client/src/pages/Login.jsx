import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../assets/css/styles.css";
import { assets } from "../assets/assets";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await API.post("/user/login", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center  h-100">
          <div className="col-lg-6">
            <div className="card rounded-3 text-black justify-content-center align-items-center">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center pb-4">
                  <img src={assets.logo} height="90" />
                </div>

                <form onSubmit={handleSubmit}>
                  <p>Please login to your account</p>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example11">
                      Email
                    </label>
                    <input
                      type="email"
                      id="form2Example11"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example22">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form2Example22"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="text-center pt-1 mb-4 pb-1">
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-danger btn-block fa-lg gradient-custom-2 mb-3"
                      type="submit"
                    >
                      Log in
                    </button>

                    {errorMessage && (
                      <p className="text-danger mt-3">{errorMessage}</p>
                    )}
                    <br />
                    <button
                      className="text-muted btn btn-link"
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button
                      type="button"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-danger"
                      onClick={() => navigate("/register")}
                    >
                      Create new
                    </button>
                  </div>
                  <br />
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
