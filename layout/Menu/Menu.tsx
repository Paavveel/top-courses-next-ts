import cn from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { KeyboardEvent, useContext, useState } from 'react';
import { AppContext } from '../../context';
import { firstLevelMenu } from '../../helpers/helpers';
import { FirstLevelMenuItem, PageItem } from '../../interfaces';
import styles from './Menu.module.css';

const variants = {
  visible: {
    marginBottom: 20,
    height: 'auto',
  },
  hidden: {
    height: 0,
    marginBottom: 0,
  },
};

const variantsChildren = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0.5,
  },
};

export const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    const updatedMenu = menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        setAnnounce(m.isOpened ? 'closed' : 'opened');
        m.isOpened = !m.isOpened;
      }
      return m;
    });

    setMenu && setMenu(updatedMenu);
  };

  const openSecondLevelOnKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map(m => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: m.id === firstCategory,
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };
  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }

          return (
            <li key={m._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelOnKey(key, m._id.secondCategory)
                }
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };
  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map(p => (
      <motion.li key={p._id} variants={variantsChildren}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            tabIndex={isOpened ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${p.alias}` === router.asPath,
            })}
          >
            {p.category}
          </a>
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav className={styles.menu} role='navigation'>
      {announce && (
        <span role='log' className='visuallyHidden'>
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};
