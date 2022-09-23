import cn from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ButtonIcon, Logo } from '../../components';
import { Sidebar } from '../Sidebar';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

const variants = {
  opened: {
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 20,
    },
  },
  closed: {
    opacity: 0,
    x: '100%',
  },
};

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon
        icon='menu'
        appearance='white'
        onClick={() => setIsOpened(true)}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial='closed'
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          icon='close'
          appearance='white'
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};
