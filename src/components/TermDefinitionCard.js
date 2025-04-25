import React from 'react';
import styles from './TermDefinitionCard.module.css';

const TermDefinitionCard = ({ term, definition }) => {
  return (
    <li className={styles.card}>
      <div className={styles.term}>{term}</div>
      <div className={styles.separator}></div>
      <div className={styles.definition}>{definition}</div>
      <div className={styles.actions}>
        <i className='bx bx-star'></i>            {/* Favorite */}
        <i className='bx bx-edit'></i>            {/* Edit */}
      </div>
    </li>
  );
};

export default TermDefinitionCard;
