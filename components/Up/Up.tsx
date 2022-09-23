import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import styles from './Up.module.css';
import UpIcon from './up.svg';

export const Up = () => {
  const controls = useAnimation();
  const y = useScrollY();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    controls.start({ opacity: y > 300 ? 1 : 0 });
  }, [y, controls]);

  return (
    <motion.button
      className={styles.up}
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.02, ease: 'linear' }}
    >
      <UpIcon />
    </motion.button>
  );
};
