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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Form validation
    if (!formData.username.trim()) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters");
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
        setError("There's an issue with the Firebase configuration. Please try again later.");
      } else {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("This email is already registered. Please try logging in instead.");
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;
          case "auth/weak-password":
            setError("Password is too weak. Please use a stronger password.");
            break;
          case "auth/network-request-failed":
            setError("Network error. Please check your internet connection.");
            break;
          case "auth/operation-not-allowed":
            setError("Email/password sign up is not enabled. Please contact support.");
            break;
          default:
            setError(`Authentication error: ${error.message}`);
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
          />
          <InputField
            label="Email"
            type="email"
            icon="📧"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            icon="🔒"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            icon="🔑"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          {error && <div className={styles.error}>{error}</div>}

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
