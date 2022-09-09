import type { NextPage } from 'next';
import { Button, Htag, P, Rating, Tag } from '../components';

const Home: NextPage = () => {
  return (
    <div>
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
      <Rating rating={4} />
    </div>
  );
};

export default Home;
