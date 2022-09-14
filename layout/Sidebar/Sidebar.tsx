import cn from 'classnames';
import Link from 'next/link';
import { Menu } from '../Menu';
import styles from './Sidebar.module.css';
import { SidebarProps } from './Sidebar.props';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Link href='/'>
        <a className={styles.logo}>Top Courses</a>
      </Link>
      <div>Search</div>
      <Menu />
    </div>
  );
};
