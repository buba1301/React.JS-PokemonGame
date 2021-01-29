import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import PokemonCard from './components/PokemonCard';

import pokemons from './pokemons';
import { gameRules, gameRules1 } from './gameRules';

import './App.css';

import bg1 from './assets/bg1.jpg';
import bg3 from './assets/bg3.jpg';

const App = () => {
  return (
    <>
      <Header title='This is Pokemons Card Game' desc='Fight or Die' />

      <Layout key='1' id='1' title='Game Rules' urlBg={bg1}>
        <div className='flex'>
          <p>{gameRules}</p>
          <p>{gameRules1}</p>
        </div>
      </Layout>
      <Layout key='2' id='2' title='Cards' colorBg='red'>
        <div className='flex'>
          {pokemons.map(({ type, values, name, img, id }) => {
            return (
              <PokemonCard
                key={id}
                type={type}
                values={values}
                name={name}
                img={img}
                id={id}
              />
            );
          })}
        </div>
      </Layout>
      <Layout key='3' id='3' title='Layout 3' urlBg={bg3} />

      <Footer />
    </>
  );
};

export default App;
