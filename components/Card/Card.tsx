import cn from 'classnames';
import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export const Card = forwardRef(
  (
    {
      color = 'white',
      children,
      className,
      ...props
    }: PropsWithChildren<CardProps>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={cn(className, styles.card, {
          [styles.blue]: color === 'blue',
        })}
        {...props}
      >
        {children}
      </div>
    );
  }
);
