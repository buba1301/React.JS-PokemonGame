import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import pokemons from '../../../../pokemons';

import PokemonCard from '../../../../components/PokemonCard';
import Button from '../../../../components/Button';

import s from './Start.module.css';

import { FireBaseContext } from '../../../../context/fireBaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';

const StartPage = () => {
  const fireBase = useContext(FireBaseContext);
  const pokemon = useContext(PokemonContext);

  const history = useHistory();

  const [pokemonsList, setPokemons] = useState({});

  useEffect(() => {
    fireBase.getPokemonsSoket((pokemons) => {
      setPokemons(pokemons);
    });
  }, []);

  const handleOpenCard = (currentId) => {
    pokemon.addPokemon(
      Object.entries(pokemonsList).find(
        ([_key, pokemonValues]) => currentId === pokemonValues.id
      )
    );
  };

  const handleClickAddPokemon = () => {
    history.push('/game/board');
  };

  return (
    <div className={s.container}>
      <Button onClick={handleClickAddPokemon}>Play Game</Button>
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
