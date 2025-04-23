import React from "react";
import styles from "./SideBar.module.css";
import "../styles/global.css";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";


const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.logo}>
                <img src="/reviewhero.png" alt="Review Hero Logo" /> 
                <span>Review Hero</span>
                </div>
            </div>

            <nav className={styles.links}>
                <ul>
                    <li><Link to="/landing">Home</Link></li>
                    <li><a href="/studysets">Study Sets</a></li>
                    <li><a href="#">Folders</a></li>
                    <li><a href="#">Classes</a></li>
                    <li><a href="#">Achievements</a></li>
                </ul>
            </nav>
            <button className={styles.createButton}>+ Create Study Set</button>
    </div>
  );
};

export default SideBar;
