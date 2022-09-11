import axios from 'axios';
import type { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { MenuItem } from '../interfaces';
import { withLayout } from '../layout/Layout';

const Home = ({ menu }: HomeProps) => {
  const [rating, setRating] = useState<number>(3);

  return (
    <>
      <Htag tag='h1'>Заголовок</Htag>
      <Button appearance='primary' arrow='right'>
        Кнопка 1
      </Button>
      <Button appearance='ghost' arrow='down'>
        Кнопка 2
      </Button>
      <P size='l'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</P>
      <P>Lorem ipsum dolor sit amet consectetur adipisicing elit.</P>
      <P size='s'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</P>
      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>
        Red
      </Tag>
      <Tag size='s' color='green'>
        Green
      </Tag>
      <Tag size='s' color='primary'>
        Primary
      </Tag>
      <Tag size='s' color='gray'>
        10
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <Rating rating={rating} />
    </>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory }
  );
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
