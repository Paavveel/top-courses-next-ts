import cn from 'classnames';
import { NextPage } from 'next';
import { KeyboardEvent, PropsWithChildren, useRef, useState } from 'react';
import { Up } from '../components';
import { AppContextProvider, IAppContext } from '../context';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './Layout.module.css';
import { Sidebar } from './Sidebar';

const Layout = ({ children }: PropsWithChildren) => {
  const [isSkippedLinkDisplayed, setIsSkippedLinkDisplayed] =
    useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      mainRef.current?.focus();
    }
    setIsSkippedLinkDisplayed(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkippedLinkDisplayed(true)}
        onKeyDown={key => skipContentAction(key)}
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkippedLinkDisplayed,
        })}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main ref={mainRef} tabIndex={0} className={styles.main}>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: NextPage<T>
) => {
  return function withLayoutComponent(props: T) {
    const { menu, firstCategory } = props;
    return (
      <AppContextProvider menu={menu} firstCategory={firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
