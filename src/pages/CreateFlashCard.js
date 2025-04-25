import styles from "./CreateFlashCard.module.css";
import TopBar from "../components/TopBar";

const CreateFlashCard = () => {
  return (
    <div>
      <div className={styles.topBar}>
        <h3>Review Hero</h3>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
        <div className={styles.profile}>
          <img
            src="./logo192.png"
            alt="Profile"
            className={styles.profilePic}
          />
          <span className={styles.userName}>Jhayvot G.</span>
        </div>
      </div>

      <div className={styles.content}>
        <i class='bx bxs-tag-x'></i>
        <h1>Create New Flashcard Set</h1>
          <div className={styles.textboxes}>
            <input className={styles.title}></input>
            <input className={styles.description}></input>
            <button className={styles.import}>➕ Import</button>
            <button className={styles.picture}>➕ Add Picture</button>
            <button className={styles.note}>➕ Create from Notes</button>
            <i class='bx bx-cog' ></i>
          </div>
          <div className={styles.problem}>
            <input className={styles.definition}></input>
          </div>
      </div>
    </div>
  );
};

export default CreateFlashCard;
