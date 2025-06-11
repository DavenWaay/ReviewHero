import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./SignupPage.module.css";
import InputField from "../components/InputField";
import FeatureCard from "../components/FeatureCard";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helper function to get error message for each field
  const getFieldError = (fieldName, value) => {
    if (!value || !value.trim()) {
      return "Please fill out this field";
    }
    return "";
  };

  // Helper function to get password confirmation error
  const getConfirmPasswordError = (password, confirmPassword) => {
    if (!confirmPassword || !confirmPassword.trim()) {
      return "Please fill out this field";
    }
    if (password && confirmPassword && password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setLoading(true);

    // Form validation
    if (!formData.username.trim() || !formData.email.trim() || 
        !formData.password.trim() || !formData.confirmPassword.trim()) {
      setGeneralError("Please fill out all fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setGeneralError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setGeneralError("Password should be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      console.log("Creating user account...");
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      console.log("User account created, updating profile...");
      // Update user profile with username
      await updateProfile(userCredential.user, {
        displayName: formData.username.trim()
      });

      console.log("Profile updated successfully");
      // Navigate to library page after successful signup
      navigate("/library");
    } catch (error) {
      console.error("Error signing up:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      // Log the full error object for debugging
      console.log("Full error object:", JSON.stringify(error, null, 2));
      
      if (error.code === "auth/api-key-not-valid") {
        setGeneralError("There's an issue with the Firebase configuration. Please try again later.");
      } else {
        switch (error.code) {
          case "auth/email-already-in-use":
            setGeneralError("This email is already registered. Please try logging in instead.");
            break;
          case "auth/invalid-email":
            setGeneralError("Please enter a valid email address.");
            break;
          case "auth/weak-password":
            setGeneralError("Password is too weak. Please use a stronger password.");
            break;
          case "auth/network-request-failed":
            setGeneralError("Network error. Please check your internet connection.");
            break;
          case "auth/operation-not-allowed":
            setGeneralError("Email/password sign up is not enabled. Please contact support.");
            break;
          default:
            setGeneralError(`Authentication error: ${error.message}`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Sign Up Form */}
      <div className={styles.signupForm}>
        <h2>Create your Hero Account</h2>
        <p>Join the ReviewHero Community and Transform your study habits!</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            type="text"
            icon="👤"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            error={getFieldError("username", formData.username)}
          />
          <InputField
            label="Email"
            type="email"
            icon="📧"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            error={getFieldError("email", formData.email)}
          />
          <InputField
            label="Password"
            type="password"
            icon="🔒"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            error={getFieldError("password", formData.password)}
          />
          <InputField
            label="Confirm Password"
            type="password"
            icon="🔑"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            error={getConfirmPasswordError(formData.password, formData.confirmPassword)}
          />

          {generalError && <div className={styles.error}>{generalError}</div>}

          <button 
            type="submit" 
            className={styles.signupButton}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p>Already have an account? <Link to="/login">Login Here</Link></p>
      </div>

      {/* Right Side - Features */}
      <div className={styles.features}>
        <h2>Begin your Hero Journey</h2>
        <p>Create your hero profile and start earning achievements as you master new subjects.</p>

        <FeatureCard
          title="Effective Learning"
          description="Our flashcard system is designed to optimize retention."
        />
        <FeatureCard
          title="Gamified Experience"
          description="Turn your studying into an adventure with quests and rewards."
        />
        <FeatureCard
          title="Community"
          description="Connect with fellow learners and compete on leaderboards."
        />
      </div>
    </div>
  );
};

export default SignUpPage;
