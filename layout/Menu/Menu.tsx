import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context';
import styles from './Menu.module.css';

export const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);

  return (
    <div className={cn(styles.menu)}>
      <ul>
        {menu.map((m, i) => (
          <li key={i}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </div>
  );
};
