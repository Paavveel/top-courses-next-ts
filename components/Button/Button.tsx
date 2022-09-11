import cn from 'classnames';
import { PropsWithChildren } from 'react';
import ArrowIcon from './arrow.svg';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

export const Button = ({
  appearance,
  arrow = 'none',
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === 'down',
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
