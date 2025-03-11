import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ label, type, icon }) => {
  return (
    <div className={styles.inputContainer}>
      <span className={styles.icon}>{icon}</span>
      <input type={type} placeholder={label} className={styles.input} />
    </div>
  );
};

export default InputField;
