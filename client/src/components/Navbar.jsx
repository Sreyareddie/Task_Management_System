import React, { useEffect, useState } from "react";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import API from "../api";
import { assets } from "../assets/assets";

const Navbar = ({ onNavChange, activePage }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [dropdownInitialized, setDropdownInitialized] = useState(false);

  useEffect(() => {
    const initializeDropdown = async () => {
      try {
        await initMDB({ Dropdown, Collapse });
        setDropdownInitialized(true);
      } catch (error) {
        console.error("Error initializing MDB:", error);
      }
    };

    if (!dropdownInitialized) {
      initializeDropdown();
    }

    return () => {
      setDropdownInitialized(false);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    const dropdownMenu = document.querySelector(
      '[aria-labelledby="navbarDropdownMenuAvatar"]'
    );
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <button
          data-mdb-collapse-init
          className="navbar-toggler"
          type="button"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="navbar-toggler-icon"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img src={assets.logo} height="35" alt="MDB Logo" loading="lazy" />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activePage === "dashboard" ? "active" : ""
                }`}
                role="button"
                onClick={() => onNavChange("dashboard")}
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activePage === "tasks" ? "active" : ""}`}
                role="button"
                onClick={() => onNavChange("tasks")}
              >
                Tasks
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activePage === "feed" ? "active" : ""}`}
                role="button"
                onClick={() => onNavChange("feed")}
              >
                Feed
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <a
            onClick={toggleDropdown}
            className="dropdown-toggle d-flex align-items-center hidden-arrow"
            id="navbarDropdownMenuAvatar"
            role="button"
            aria-expanded="false"
          >
            <img
              src={assets.user_profile}
              className="rounded-circle"
              height="25"
              alt="profile"
              loading="lazy"
            />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <div className="px-3 mb-4 border-bottom">
              <h5>{user.name}</h5>
              <p>
                <i>{user.email}</i>
              </p>
            </div>
            <li>
              <a
                className="dropdown-item btn btn-danger"
                role="button"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
