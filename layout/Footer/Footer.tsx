import cn from 'classnames';
import { format } from 'date-fns';
import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>Top Courses © {format(new Date(), 'yyyy')} Все права защищены</div>
      <a href='#'>Пользовательское соглашение</a>
      <a href='#'>Политика конфиденциальности</a>
    </footer>
  );
};
