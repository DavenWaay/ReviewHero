import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./LoginPage.module.css";
import InputField from "../components/InputField";
import FeatureCard from "../components/FeatureCard";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Navigate to library page after successful login
      navigate("/library");
    } catch (error) {
      console.error("Error logging in:", error);
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Failed to log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Login Form */}
      <div className={styles.loginForm}>
        <h2>Welcome Back, Hero!</h2>
        <p>Continue your learning journey with ReviewHero</p>

        <form onSubmit={handleSubmit}>
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

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>Don't have an account? <Link to="/signup">Sign Up Here</Link></p>
      </div>

      {/* Right Side - Features */}
      <div className={styles.features}>
        <h2>Welcome Back to Your Journey</h2>
        <p>Pick up where you left off and continue mastering new subjects.</p>

        <FeatureCard
          title="Track Progress"
          description="See your learning stats and achievements."
        />
        <FeatureCard
          title="Study Smart"
          description="Use our proven learning methods to maximize retention."
        />
        <FeatureCard
          title="Stay Motivated"
          description="Earn rewards and compete with friends."
        />
      </div>
    </div>
  );
};

export default LoginPage;
