import { useState, useEffect } from 'react';
import pokemons from '../../pokemons';

import PokemonCard from '../../components/PokemonCard';

import s from './GamePage.module.css';

import { database } from '../../service/firebase';

const GamePage = () => {
  const [pokemonsList, setPokemons] = useState({});

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      console.log('Snapshot', snapshot.val());
      setPokemons(snapshot.val());
    });
  }, []);

  const handleOpenCard = (currentId) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, [key, pokemonValues]) => {
        const { active, id } = pokemonValues;

        if (currentId === id) {
          const newPokemon = { ...pokemonValues, active: !active };

          database.ref('pokemons/' + key).set(newPokemon);
          acc = { ...acc, [key]: newPokemon };
        } else {
          acc = { ...acc, [key]: pokemonValues };
        }
        return acc;
      }, {});
    });
  };

  return (
    <div className={s.flex}>
      {Object.entries(pokemonsList).map(
        ([key, { type, values, name, img, id, active }]) => {
          return (
            <PokemonCard
              key={key}
              type={type}
              values={values}
              name={name}
              img={img}
              id={id}
              handleOpenCard={handleOpenCard}
              active={active}
            />
          );
        }
      )}
    </div>
  );
};

export default GamePage;
