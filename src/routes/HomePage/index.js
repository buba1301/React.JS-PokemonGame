import Header from '../../components/Header';
import Layout from '../../components/Layout';

import { gameRules, gameRules1 } from '../../gameRules';

import s from './HomePage.module.css';

import bg1 from './assets/bg1.jpg';

const HomePage = ({ onChangePage }) => {
  const onClickButton = (page) => {
    onChangePage && onChangePage(page);
  };

  return (
    <>
      <Header
        title='This is Pokemons Card Game'
        desc='Fight or Die'
        onClickButton={onClickButton}
      />

      <Layout key='1' id='1' title='Game Rules' urlBg={bg1}>
        <div className={s.flex}>
          <p>{gameRules}</p>
          <p>{gameRules1}</p>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
