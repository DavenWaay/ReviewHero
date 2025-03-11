import React from "react";
import styles from "./FeatureCard.module.css";

const FeatureCard = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
