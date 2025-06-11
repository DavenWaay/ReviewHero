import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ 
  label, 
  type, 
  icon, 
  name, 
  value, 
  onChange, 
  required = false,
  error = null 
}) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>{icon}</span>
        <input 
          type={type} 
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label} 
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          required={required}
          title="Please fill out this field"
          onInvalid={(e) => {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
              e.target.setCustomValidity("Please fill out this field");
            }
          }}
          onInput={(e) => e.target.setCustomValidity("")}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default InputField;
