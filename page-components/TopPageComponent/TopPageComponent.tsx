import { useEffect, useReducer } from 'react';
import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { SortEnum } from '../../components/Sort/Sort.props';
import { TopLevelCategory } from '../../interfaces';
import { sortReducer } from './sort.reducer';
import styles from './TopPageComponent.module.css';
import { TopPageComponentProps } from './TopPageComponent.props';

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products: products,
      sort: SortEnum.Rating,
    }
  );

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page?.title}</Htag>
        <Tag color='gray' size='m' aria-label={`${products.length} элементов`}>
          {products && products.length}
        </Tag>
        <Sort sort={sort} setSort={setSort} />
      </div>

      <div role='list'>
        {sortedProducts &&
          sortedProducts.map(p => (
            <Product role='listitem' key={p._id} layout product={p} />
          ))}
      </div>

      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакансии - {page?.category}</Htag>
        <Tag color='red' size='m'>
          hh.ru
        </Tag>
      </div>

      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}

      {page?.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}

      {page?.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}

      <Htag tag='h2'>Получаемые навыки</Htag>
      {page?.tags?.map(t => (
        <Tag key={t} className={styles.skill} color='primary'>
          {t}
        </Tag>
      ))}
    </div>
  );
};
