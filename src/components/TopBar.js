import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import styles from "./TopBar.module.css";

const TopBar = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate('/landing');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className={styles.topBar}>
            <div className={styles.searchWrapper}>
            <input
                type="text"
                placeholder="Find a quiz"
                className={styles.searchInput}
            />
            </div>


            <div className={styles.profile}>
                {user ? (
                    <>
                        <img 
                            src={user.photoURL || "./jhayvot.jfif"} 
                            alt="Profile" 
                            className={styles.profilePic} 
                        />
                        <span className={styles.userName}>
                            {user.displayName || user.email?.split('@')[0] || 'User'}
                        </span>
                        <button 
                            onClick={handleSignOut}
                            className={styles.signOutBtn}
                            title="Sign Out"
                        >
                            <i className="bx bx-log-out"></i>
                        </button>
                    </>
                ) : (
                    <div className={styles.authButtons}>
                        <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
                        <button className={styles.signupBtn} onClick={handleSignup}>Sign Up</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
