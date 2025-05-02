import styles from "./TopBar.module.css";

const TopBar = () => {
    return (
        <div className={styles.topBar}>
              <input type="text" placeholder="Search..." className={styles.searchInput} />
              <div className={styles.profile}>
                <img src="./jhayvot.jfif?v=1" alt="Profile" className={styles.profilePic} />
                <span className={styles.userName}>Jhayvot G.</span>
              </div>
        </div>
    )
}

export default TopBar;