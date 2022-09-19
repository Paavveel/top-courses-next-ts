import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import CloseIcon from './close.svg';
import { IReviewForm } from './ReviewForm.interface';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps) => {
  const { register, control, handleSubmit } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(className, styles.reviewForm)} {...props}>
        <Input {...register('name')} placeholder='Имя' />
        <Input {...register('title')} placeholder='Заголовок отзыва' />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            render={({ field: { value, ref, onChange } }) => (
              <Rating
                rating={value}
                ref={ref}
                setRating={onChange}
                isEditable
              />
            )}
          />
        </div>
        <Textarea
          {...register('description')}
          placeholder='Текст отзыва'
          className={styles.description}
        />
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
    </form>
  );
};
