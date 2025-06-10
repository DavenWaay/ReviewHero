import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";
import "../styles/global.css";
import "boxicons/css/boxicons.min.css";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={process.env.PUBLIC_URL + "/reviewhero.png"} alt="Review Hero Logo" />
          <span>Review Hero</span>
        </div>
      </div>

      <nav className={styles.links}>
        <ul>
          <li>
            <NavLink 
              to="/landing" 
              className={({ isActive }) => 
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/studysets" 
              className={({ isActive }) => 
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Study Sets
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/library" 
              className={({ isActive }) => 
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Library
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/achievements" 
              className={({ isActive }) => 
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Achievements
            </NavLink>
          </li>
        </ul>
      </nav>

      <button 
        className={styles.createButton} 
        onClick={() => navigate("/createstudyset")}
      >
        + Create Study Set
      </button>
    </div>
  );
};

export default SideBar;
