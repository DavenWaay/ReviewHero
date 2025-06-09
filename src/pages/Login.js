import styles from './Login.module.css';
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.formSection}>
          <h2 className={styles.logo}>Review Hero</h2>
          <p className={styles.welcome}>Welcome back !!!</p>
          <h1 className={styles.title}>Log In</h1>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <div className={styles.inputWrapper}>
              <input type="email" className={styles.input} placeholder="login@gmail.com" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <input type="password" className={styles.input} placeholder="*********" />
              <span className={styles.forgot}>Forgot Password?</span>
            </div>
          </div>

          <NavLink to="/landing" className={styles.loginButton}>
              LOGIN
          </NavLink>

          

          <p className={styles.or}>or continue with</p>

          <div className={styles.socials}>
            <button className={styles.socialBtn}><i class='bx bxl-google'></i></button>
            <button className={styles.socialBtn}><i class='bx bxl-github'></i></button>
            <button className={styles.socialBtn}><i class='bx bxl-facebook-circle' ></i></button>
          </div>
          
          <p className={styles.signup}>Don’t have an account yet? 
          <NavLink to="/signup">
            <span>Sign up for free</span>
          </NavLink>
          </p>
        </div>

        <div className={styles.side}>
        {/* <img src="./reviewhero.png?v=1" alt="studyIcon" className={styles.centerImage} /> */}
          
        </div>
      </div>
    </div>
  );
}
