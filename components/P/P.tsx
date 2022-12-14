import cn from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './P.module.css';
import { PProps } from './P.props';

export const P = ({
  size = 'm',
  children,
  className,
  ...props
}: PropsWithChildren<PProps>) => {
  return (
    <p
      className={cn(className, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.l]: size === 'l',
      })}
      {...props}
    >
      {children}
    </p>
  );
};
