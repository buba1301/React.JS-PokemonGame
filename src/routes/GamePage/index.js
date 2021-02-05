import { useState } from 'react';
import pokemons from '../../pokemons';

import PokemonCard from '../../components/PokemonCard';

import s from './GamePage.module.css';

const GamePage = () => {
  const [pokemonsList, setPokemons] = useState(pokemons);

  const handleOpenCard = (currentId) => {
    setPokemons((prevState) => {
      return prevState.map((item) => {
        const { active, id } = item;

        return currentId === id ? { ...item, active: !active } : item;
      });
    });
  };

  return (
    <div className={s.flex}>
      {pokemonsList.map(({ type, values, name, img, id, active }) => {
        return (
          <PokemonCard
            key={id}
            type={type}
            values={values}
            name={name}
            img={img}
            id={id}
            handleOpenCard={handleOpenCard}
            active={active}
          />
        );
      })}
    </div>
  );
};

export default GamePage;
