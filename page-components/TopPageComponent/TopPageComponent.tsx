// import cn from 'classnames';
import { HhData, Htag, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces';
import styles from './TopPageComponent.module.css';
import { TopPageComponentProps } from './TopPageComponent.props';

export const TopPageComponent = ({
  page,
  product,
  firstCategory,
}: TopPageComponentProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        <Tag color='gray' size='m'>
          {product && product.length}
        </Tag>
        <span>Sort</span>
      </div>

      <div>{product && product.map(p => <div key={p._id}>{p.title}</div>)}</div>

      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page.category}</Htag>
        <Tag color='red' size='m'>
          hh.ru
        </Tag>
      </div>

      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
    </div>
  );
};
