import classNames from 'classnames';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteUser } from '../../store/reducers/user/userSlice';
import useForce from '../../utils/useForce';
import styles from './Header.module.scss';
import Notification from './Notification';

function HeaderAccount(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useForce(location);

  return (
    <header className={styles.header}>
      <div className={styles.header_top}>
        <div className={styles.header_top_location}>Україна</div>

        <div className={styles.header_top_user}>
          {user.firstname}
          <div className={styles.drop_down_profile}>
            <div className={styles.header_user_drpop_down_menu}>
              <Link
                className={classNames(
                  styles.header_top_user,
                  styles.header_top_user_hover,
                  styles.header_user_drpop_down_link,
                  styles.header_user_drpop_down_user
                )}
                to={`/profile/${user.id}`}
              >
                Мій профіль
              </Link>
              <Link
                className={styles.header_user_drpop_down_link}
                to={`/profile/${user.id}/settings`}
              >
                Налаштувати профіль
              </Link>
              <button
                type="button"
                className={classNames(
                  styles.header_user_drpop_down_link,
                  styles.header_user_drpop_down_exit
                )}
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('refresh_token');
                  dispatch(deleteUser());
                  navigate('/');
                }}
              >
                Вийти
              </button>
              {/* <Link
                className={classNames(styles.header_user_drpop_down_link, styles.header_user_drpop_down_exit)}
                to="/sign-in"
              >
                Вийти
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header_title_notification}>
        <div className={styles.header_title}>
          <Link to="/">ІНТЕРВ'Ю IT</Link>
        </div>
        <div>
          <div className={styles.header_title_notification}>
            {Boolean(user.id) && <Notification />}
          </div>
          {/* <div><Link className={styles.header_link} to={}></Link></div> */}
        </div>
      </div>

      <div className={styles.header_linksContainer}>
        <div>
          <Link
            className={styles.header_link}
            to={`/profile/${user.id}/my_statistics`}
          >
            Моя статистика
          </Link>
          <Link
            className={styles.header_link}
            to={`/profile/${user.id}/statistics`}
          >
            Статистика інтерв’юерів
          </Link>
        </div>
        <div>
          <Link className={styles.header_link} to="/candidate-search">
            Знайти кандидата
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderAccount;
