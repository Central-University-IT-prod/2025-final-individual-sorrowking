import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VisitPage.module.scss';

const VisitPage = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const symbolTypingTimeMs = 100;
  const symbolDeletingTimeMs = 75;
  const subtitleLifeTimeMs = 5000;
  const animatedPartOptions = ['Каталог упражнений', 'Конструктор тренировок', 'Система прогрессии'];

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = animatedPartOptions[currentIndex];

      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          const typingPause = subtitleLifeTimeMs - (symbolTypingTimeMs + symbolDeletingTimeMs) * currentText.length;
          setTimeout(() => setIsDeleting(true), typingPause);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % animatedPartOptions.length);
        }
      }

      setTypingSpeed(isDeleting ? symbolDeletingTimeMs : symbolTypingTimeMs);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, typingSpeed]);

  return (
    <div className={styles.visit}>
      <div className={styles.hero}>
        <h1 className={styles.hero__title}>
          <span className={styles.hero__animatedText}>
            {currentText}
          </span>
        </h1>
        <p className={styles.hero__subtitle}>Всё для вашего совершенствования</p>
        <button 
          className={styles.visit__button}
          onClick={() => navigate('/catalogue')}
        >
          НАЧАТЬ
        </button>
      </div>
    </div>
  );
};

export default VisitPage;