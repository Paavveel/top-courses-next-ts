import cn from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './Tag.module.css';
import { TagProps } from './Tag.props';

export const Tag = ({
  size = 's',
  children,
  color = 'ghost',
  href,
  className,
  ...props
}: PropsWithChildren<TagProps>) => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.ghost]: color === 'ghost',
        [styles.gray]: color === 'gray',
        [styles.green]: color === 'green',
        [styles.red]: color === 'red',
        [styles.primary]: color === 'primary',
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
