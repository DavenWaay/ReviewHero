import React from "react";
import styles from "./SignupPage.module.css";
import InputField from "../components/InputField";
import FeatureCard from "../components/FeatureCard";

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      {/* Left Side - Sign Up Form */}
      <div className={styles.signupForm}>
        <h2>Create your Hero Account</h2>
        <p>Join the ReviewHero Community and Transform your study habits!</p>

        <InputField label="Username" type="text" icon="👤" />
        <InputField label="Email" type="email" icon="📧" />
        <InputField label="Password" type="password" icon="🔒" />
        <InputField label="Confirm Password" type="password" icon="🔑" />

        <button className={styles.signupButton}>Create Account</button>
        <p>Already have an account? <a href="#">Login Here</a></p>
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
