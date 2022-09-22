import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { declOfNum, toRub } from '../../helpers/helpers';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Divider } from '../Divider/Divider';
import { Rating } from '../Rating/Rating';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { Tag } from '../Tag/Tag';
import styles from './Product.module.css';
import { ProductProps } from './Product.props';

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      };

      return (
        <div ref={ref} className={className} {...props}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              {product.price && `${toRub.format(product.price)}`}
              {product.oldPrice && product.price && (
                <Tag color='green' className={styles.oldPrice}>
                  {toRub.format(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {product.credit && (
                <>
                  {toRub.format(product.credit)}
                  <span>/мес</span>
                </>
              )}
            </div>
            <div className={styles.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories?.map(c => (
                <Tag key={c} color='ghost' className={styles.tag}>
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}>
              <a href='#ref' onClick={scrollToReview}>
                {product.reviewCount}{' '}
                {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics?.map(c => (
                <div key={c.name} className={styles.characteristics}>
                  <span className={styles.characteristicsName}>{c.name}</span>
                  <span className={styles.characteristicsDots}></span>
                  <span className={styles.characteristicsValue}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance='primary' className={styles.moreButton}>
                Узнать подробнее
              </Button>
              <Button
                appearance='ghost'
                arrow={isReviewOpened ? 'down' : 'right'}
                className={styles.reviewButton}
                onClick={() => setIsReviewOpened(!isReviewOpened)}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <Card
            ref={reviewRef}
            color='blue'
            className={cn(styles.reviews, {
              [styles.opened]: isReviewOpened,
              [styles.closed]: !isReviewOpened,
            })}
          >
            {product.reviews?.map(r => (
              <div key={r._id} className={styles.reviewsWrapper}>
                <Review review={r} />
                <Divider />
              </div>
            ))}
            <ReviewForm productId={product._id} />
          </Card>
        </div>
      );
    }
  )
);
