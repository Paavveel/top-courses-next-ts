import axios from 'axios';
import type { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { MenuItem } from '../interfaces/menu.interface';
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
      <P size='l'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
        fugiat modi. Perferendis veniam totam possimus atque enim, nostrum
        officia delectus natus distinctio repellendus eligendi deserunt
        recusandae voluptas officiis nulla nesciunt dignissimos ea sit odit
        error corrupti quis earum. Blanditiis voluptate deleniti modi dolorum
        eos in architecto ipsa dignissimos maiores eveniet!
      </P>
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
        fugiat modi. Perferendis veniam totam possimus atque enim, nostrum
        officia delectus natus distinctio repellendus eligendi deserunt
        recusandae voluptas officiis nulla nesciunt dignissimos ea sit odit
        error corrupti quis earum. Blanditiis voluptate deleniti modi dolorum
        eos in architecto ipsa dignissimos maiores eveniet!
      </P>
      <P size='s'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
        fugiat modi. Perferendis veniam totam possimus atque enim, nostrum
        officia delectus natus distinctio repellendus eligendi deserunt
        recusandae voluptas officiis nulla nesciunt dignissimos ea sit odit
        error corrupti quis earum. Blanditiis voluptate deleniti modi dolorum
        eos in architecto ipsa dignissimos maiores eveniet!
      </P>
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
      <ul>
        {menu.map((m, i) => (
          <li key={i}>{m._id.secondCategory}</li>
        ))}
      </ul>
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
