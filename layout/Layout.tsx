import { FunctionComponent } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { LayoutProps } from './Layout.props';
import { Sidebar } from './Sidebar';

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div>{children}</div>
      </main>
      <Footer />
    </>
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
