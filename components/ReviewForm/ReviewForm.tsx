import cn from 'classnames';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import CloseIcon from './close.svg';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps) => {
  return (
    <>
      <div className={cn(className, styles.reviewForm)} {...props}>
        <Input placeholder='Имя' />
        <Input placeholder='Заголовок отзыва' />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Rating rating={0} />
        </div>
        <Textarea placeholder='Текст отзыва' className={styles.description} />
        <div className={styles.submit}>
          <Button appearance='primary' className={styles.submitButton}>
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
        <CloseIcon className={styles.successClose} />
      </div>
    </>
  );
};
