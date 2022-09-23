import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import styles from './Up.module.css';

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
    <motion.div
      className={styles.up}
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.1 }}
    >
      <ButtonIcon icon='up' appearance='primary' onClick={scrollToTop} />
    </motion.div>
  );
};
