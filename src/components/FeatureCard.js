import React from "react";
import styles from "./FeatureCard.module.css";

const FeatureCard = ({ title, description, iconClass }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <i className={iconClass}></i>
      </div>
      <div className={styles.text}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};


export default FeatureCard;
