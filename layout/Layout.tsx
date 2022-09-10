import { FunctionComponent } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import { Sidebar } from './Sidebar';

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.main}>{children}</main>
      <Footer className={styles.footer} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};
