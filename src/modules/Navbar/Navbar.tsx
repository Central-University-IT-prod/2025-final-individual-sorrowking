import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { PATH_MAP, NAVBAR_ITEMS, TUTORIAL_ITEMS } from './constants';
import { LOGO_DESKTOP_PATH, LOGO_MOBILE_PATH } from '@/shared/constants/logoPaths';
import { Link, useLocation } from 'react-router-dom';
import { TutorialModal } from './components/TutorialModal/TutorialModal';
import { IconInfoCircle } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const Logo = () => {
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const logoPath = isDesktop ? LOGO_DESKTOP_PATH : LOGO_MOBILE_PATH;
  return (
  <Link to='/' aria-label="на визитную страницу" className={styles.navbar__link}>
    <img src={logoPath} alt="FitLab" className={styles.navbar__logo}/>
  </Link>
  )
};

const getTutorialKey = (pathname: string) => {
  const basePath = pathname.split('/')[1];

  return PATH_MAP[basePath] || 'catalogue';
};


const Navbar: React.FC = () => {
  const location = useLocation();
  const [tutorialOpened, setTutorialOpened] = useState(false);
  const currentTutorialKey = getTutorialKey(location.pathname);
  const tutorialItems = TUTORIAL_ITEMS[currentTutorialKey].map(item => ({
    ...item,
    image: `/assets/tutorial/${currentTutorialKey}/${item.image}`
  }));


  return (
    <div className={`${styles.navbar}`}>
      <nav className={styles.navbar__menu}>
        <Logo />

        {NAVBAR_ITEMS.map((item) => (
          <Link
            to={item.path}
            className={`${styles.navbar__menuLink}
            ${location.pathname === `${item.path}` ? styles['navbar__menuLink--active'] : ''}`}
            key={item.id}
            aria-label={item.name}
          >
            <div className={styles.navbar__linkContentWrapper}>
              <item.icon className={styles.navbar__menuIcon} aria-label={item.name}/>
              <div className={styles.navbar__linkText}>
                {item.name}
              </div>
            </div>

          </Link>
        ))}
        <Button
          variant="subtle"
          className={styles.navbar__hintButton}
          onClick={() => setTutorialOpened(true)}
          size="lg"
          aria-label="Открыть меню подсказок"
        >
          <IconInfoCircle className={styles.navbar__menuIcon} aria-label="Открыть меню подсказок"/>
        </Button>
      </nav>


      <TutorialModal
        opened={tutorialOpened} 
        onClose={() => setTutorialOpened(false)}
        items={tutorialItems}
      />
    </div>
  );
};

export default Navbar;