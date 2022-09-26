import cn from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';

export const Rating = forwardRef(
  (
    {
      rating,
      isEditable = false,
      setRating,
      error,
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r, i: number) => {
        return (
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => changeRating(i + 1)}
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            ref={r => ratingArrayRef.current?.push(r)}
            role={isEditable ? 'slider' : ''}
            aria-invalid={error ? true : false}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-label={isEditable ? 'Укажите рейтинг' : `рейтинг ${rating}`}
            aria-valuemin={1}
          >
            <StarIcon />
          </span>
        );
      });
      setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(i);
    };
    const changeRating = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) return -1;
      if (!rating && i === 0) return tabIndex ?? 0;
      if (r === i + 1) return tabIndex ?? 0;
      return -1;
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) return;
      if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
          ratingArrayRef.current[rating]?.focus();
        }
      }

      if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };
    return (
      <div
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
        {...props}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role='alert' className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
