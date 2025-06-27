import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../InterviewItemRow.module.scss';

function ToInterviewButton({ id }:{ id:number }):React.JSX.Element {
  return(
    <div className={styles.completedButton}>
      <Link to={`/interview/${id}`} >
        <div className={styles.checkButton}/>
      </Link>
      <Link to={`/interview/${id}`}>

        <p >
    Переглянути
        </p>
      </Link>

    </div>
  );
}
export default ToInterviewButton;
