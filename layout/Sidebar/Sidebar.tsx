import cn from 'classnames';
import { Menu } from '../Menu';
import styles from './Sidebar.module.css';
import { SidebarProps } from './Sidebar.props';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <p className={styles.logo}>Top Courses</p>
      <div>Search</div>
      <Menu />
    </div>
  );
};
