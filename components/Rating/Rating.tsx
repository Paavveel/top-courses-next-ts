import cn from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';

export const Rating = forwardRef(
  (
    { rating, isEditable = false, setRating, error, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    useEffect(() => {
      constructRating(rating);
    }, [rating]);

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
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                handleSpace(e, i + 1)
              }
            />
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
    const handleSpace = (e: KeyboardEvent<SVGElement>, i: number) => {
      if (e.code !== 'Space' || !setRating) {
        return;
      }
      setRating(i);
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
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
