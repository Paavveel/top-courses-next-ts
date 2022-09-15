import cn from 'classnames';
import styles from './Product.module.css';
import { ProductProps } from './Product.props';

export const Product = ({ product, className, ...props }: ProductProps) => {
  return (
    <div className={cn(className, styles.product)} {...props}>
      {product.title}
    </div>
  );
};
