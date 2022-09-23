import cn from 'classnames';
import { Logo, Search } from '../../components';
import { Menu } from '../Menu';
import styles from './Sidebar.module.css';
import { SidebarProps } from './Sidebar.props';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo />
      <Search />
      <Menu />
    </div>
  );
};
