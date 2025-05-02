import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import "../styles/global.css";
import "boxicons/css/boxicons.min.css";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
  <div className={styles.topContent}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={process.env.PUBLIC_URL + "/reviewhero.png"} alt="Review Hero Logo" />
        <span>Review Hero</span>
      </div>
    </div>

    <nav className={styles.links}>
      <ul>
        <li><NavLink to="/landing" className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ""}`}><i className='bx bx-home'></i>Home</NavLink></li>
        <li><NavLink to="/studysets" className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ""}`}><i className='bx bx-folder'></i>Study Sets</NavLink></li>
        <li><NavLink to="/library" className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ""}`}><i className='bx bx-library'></i>Library</NavLink></li>
        <li><NavLink to="/achievements" className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ""}`}><i className='bx bx-medal'></i>Achievements</NavLink></li>
      </ul>
    </nav>

    <button className={styles.createButton}>+ Create Study Set</button>
  </div>

  {/* Logout button pinned to bottom */}
      <NavLink to="/signup" className={styles.logoutButton}>
        <i className='bx bx-exit'></i>Logout
      </NavLink>
</div>

  );
};

export default SideBar;
