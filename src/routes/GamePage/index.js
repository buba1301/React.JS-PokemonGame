import { useState, useEffect } from 'react';
import pokemons from '../../pokemons';

import PokemonCard from '../../components/PokemonCard';
import Button from '../../components/Button';

import s from './GamePage.module.css';

import { database } from '../../service/firebase';

const GamePage = () => {
  const [pokemonsList, setPokemons] = useState({});
  console.log('LIST', pokemonsList);

  const [newPokemon, setNewPokemon] = useState({});

  console.log('NEWPOKE', newPokemon);

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      console.log('Snapshot', snapshot.val());
      setPokemons(snapshot.val());
    });
  }, [newPokemon]);

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

  const handleClickAddPokemon = () => {
    const newKey = database.ref().child('pokemons').push().key;
    const data = pokemons[0];
    database.ref('pokemons/' + newKey).set(data);
    setNewPokemon(data);
  };

  return (
    <div className={s.container}>
      <Button onClick={handleClickAddPokemon}>Add new pokemon</Button>
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
    </div>
  );
};

export default GamePage;
