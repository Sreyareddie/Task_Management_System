import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { assets } from "../assets/assets";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/signup", formData);
      alert("Registered successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center  h-100">
          <div className="col-lg-6">
            <div className="card rounded-3 text-black justify-content-center align-items-center">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center pb-4">
                  <img src={assets.logo} height="90" />
                </div>

                <form onSubmit={handleSubmit}>
                  <p>Please fill in the details to register</p>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="formName">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="formName"
                      placeholder="Full Name"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

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
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" htmlFor="formPassword">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="formPassword"
                      placeholder="Password"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="text-center pt-1 mb-4 pb-1">
                    <button
                      className="btn btn-danger btn-block fa-lg gradient-custom-2 mb-3"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Already have an account?</p>
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

export default Register;
