import axios from 'axios';
import cn from 'classnames';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { API } from '../../helpers/api';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import CloseIcon from './close.svg';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const onSubmit = async (formData: IReviewForm) => {
    setIsSuccess(false);
    setError('');

    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(className, styles.reviewForm)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' },
          })}
          placeholder='Имя'
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
          placeholder='Заголовок отзыва'
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
            render={({ field: { value, ref, onChange } }) => (
              <Rating
                rating={value}
                ref={ref}
                setRating={onChange}
                isEditable
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните описание' },
          })}
          placeholder='Текст отзыва'
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label='Текст отзыва'
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            appearance='primary'
            className={styles.submitButton}
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.panel, styles.success)} role='alert'>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button
            className={styles.close}
            onClick={() => setIsSuccess(false)}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={cn(styles.panel, styles.error)} role='alert'>
          Что-то пошло не так, попробуйте обновить страницу. ({error})
          <button
            className={styles.close}
            onClick={() => setError('')}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
