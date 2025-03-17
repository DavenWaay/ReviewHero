import React from "react";
import SideBar from "../components/SideBar";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <h1>Welcome to ReviewHero</h1>
        {/* Add other UI elements like search bar, study sets, etc. */}
      </div>
    </div>
  );
};

export default LandingPage;
