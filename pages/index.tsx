import type { NextPage } from 'next';
import { Button, Htag } from '../components';

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
    </div>
  );
};

export default Home;
