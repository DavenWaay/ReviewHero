import React from "react";
import SideBar from "../components/SideBar";
import 'boxicons/css/boxicons.min.css';
import TopBar from "../components/TopBar";
import QuizTitleCard from "../components/QuizTitleCard";
import styles from "./Library.module.css";
import global from "../styles/global.css";

const Library = () => {
  return (
    <div className={styles.container}>
      < SideBar/>
          <div className={styles.main}>
            < TopBar />
          <hr />
          <div className={styles.welcomeCard}>
              <h1>Your Library</h1>
          </div>
        
          <br></br>
          <div className={styles.search}>
            <i class='bx bx-search-alt-2' ></i>
            <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>
          
          <div className={styles.sectionTitle}>
          <h4>Recent</h4>
          <hr />
          </div>
          

        {/* CARDS*/}
          <QuizTitleCard />
          <QuizTitleCard />
          <QuizTitleCard />
          <QuizTitleCard />
          <QuizTitleCard />
          <QuizTitleCard />
      </div>
    </div>
  );
};

export default Library;
