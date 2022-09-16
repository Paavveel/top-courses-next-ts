import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { P } from '../P/P';
import { Rating } from '../Rating/Rating';
import styles from './Review.module.css';
import { ReviewProps } from './Review.props';
import UserIcon from './user.svg';

export const Review = ({ review, className, ...props }: ReviewProps) => {
  const { createdAt, description, name, rating, title } = review;
  return (
    <div className={cn(className, styles.review)} {...props}>
      <UserIcon className={styles.user} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {createdAt &&
          format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <P size='s' className={styles.description}>
        {description}
      </P>
    </div>
  );
};
