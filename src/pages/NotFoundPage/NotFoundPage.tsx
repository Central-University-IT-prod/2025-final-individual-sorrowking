import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__content}>
        <div className={styles.animationContainer}>
          <div className={styles.animationContainer__weightLifter} aria-hidden="true">
            <div className={styles.animationContainer__barbell}></div>
            <div className={styles.animationContainer__weight}></div>
          </div>
          <div className={styles.animationContainer__errorCode}>404</div>
        </div>
        
        <h1 className={styles.notFound__title}>Упс! Страница не найдена</h1>
        <p className={styles.notFound__message}>
          Похоже, страница, которую вы искали, пропустила день ног
        </p>
        
        <Link to="/catalogue" className={styles.notFound__homeButton}>
          Вернуться к каталогу
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;