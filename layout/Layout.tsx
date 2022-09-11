import { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import { AppContextProvider, IAppContext } from '../context';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './Layout.module.css';
import { Sidebar } from './Sidebar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.main}>{children}</main>
      <Footer className={styles.footer} />
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
