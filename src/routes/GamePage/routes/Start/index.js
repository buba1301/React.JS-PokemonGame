import { useState, useEffect, useContext } from 'react';
import pokemons from '../../../../pokemons';

import PokemonCard from '../../../../components/PokemonCard';
import Button from '../../../../components/Button';

import s from './Start.module.css';

// import { database } from '../../../../service/firebase';
import { FireBaseContext } from '../../../../context/fireBaseContext';

const StartPage = () => {
  const fireBase = useContext(FireBaseContext);

  const [pokemonsList, setPokemons] = useState({});

  useEffect(() => {
    fireBase.getPokemonsSoket((pokemons) => {
      setPokemons(pokemons);
    });
  }, []);

  const handleOpenCard = (currentId) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, [key, pokemonValues]) => {
        const newPokemon = { ...pokemonValues };

        if (currentId === newPokemon.id) {
          newPokemon.active = !newPokemon.active;
          fireBase.postPokemon(key, newPokemon);
        }
        acc = { ...acc, [key]: newPokemon };

        return acc;
      }, {});
    });
  };

  const handleClickAddPokemon = () => {
    fireBase.addPokemon(pokemons[0]);
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
                className='big'
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default StartPage;
