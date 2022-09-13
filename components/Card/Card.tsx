import cn from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export const Card = ({
  color = 'white',
  children,
  className,
  ...props
}: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={cn(className, styles.card, {
        [styles.blue]: color === 'blue',
      })}
      {...props}
    >
      {children}
    </div>
  );
};
