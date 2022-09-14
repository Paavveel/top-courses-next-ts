import { ProductModel, TopLevelCategory, TopPageModel } from '../../interfaces';

export interface TopPageComponentProps {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
