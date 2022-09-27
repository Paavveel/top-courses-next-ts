import axios from 'axios';
import type { GetStaticProps } from 'next';
import { Htag } from '../components';
import { API } from '../helpers/api';
import { MenuItem } from '../interfaces';
import { withLayout } from '../layout/Layout';

const Home = () => {
  return (
    <>
      <Htag tag='h1'>Привет! Выбирай курс! :)</Htag>
    </>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
