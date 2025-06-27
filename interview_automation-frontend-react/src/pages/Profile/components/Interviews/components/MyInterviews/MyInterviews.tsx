import React, { useCallback, useEffect, useState } from 'react';

import arrowDropDown from '../../../../../../assets/arrowDropDown.svg';
import IInterviewPreview from '../../../../../../models/profile/IInterviewPreview';
import InterviewItemRow from '../InterviewItemRow/InterviewItemRow';
import styles from './MyInterviews.module.scss';

function MyInterviews({ interviews }:{ interviews:IInterviewPreview[] }): React.JSX.Element {
  const [numberOfRows, setNumberOfRows] = useState(4);
  const [interviewsRow, setInterviews] = useState<IInterviewPreview[]>([]);

  const updateInterviews = useCallback(() => {
    setInterviews([...interviews].reverse().slice(0, numberOfRows));
  }, [interviews, numberOfRows]);
  useEffect(() => {
    updateInterviews();
  },[interviews, numberOfRows, updateInterviews]);

  const renderTableBody = (): React.JSX.Element[] => (
    interviewsRow.map((item) => (
      <InterviewItemRow
        key={item.id}
        {...item}
      />
    ))
  );

  const handleLoadMoreRows = ():void =>{
    setNumberOfRows((currentNumber:number)=>currentNumber+4);
  };
  const handleDateSort = ():void=>{
    setInterviews((prevInterviews) => [...prevInterviews].reverse());
  };

  return (
    <>
      <table className={styles.interviewTable}>
        <thead className={styles.interviewTableHeader}>
          <tr>
            <th className={styles.date}>Дата
              <button aria-label="sort by date" type="button" onClick={handleDateSort}  />
            </th>
            <th>Учасник</th>
            <th>Статус</th>
            <th>Назва</th>
            <th>Дія</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {renderTableBody()}
        </tbody>

      </table>
      {numberOfRows<=interviews.length&& (
        <div className={styles.DropDownButton}>
          <button type="button" onClick={handleLoadMoreRows}>
          завантажити ще
            <img src={arrowDropDown} width="24px" height="24px" alt="downward pointing arrow"
              className={styles.DropDownIcon}/>
          </button>
        </div>
      )      }
    </>
  );
}

export default MyInterviews;
