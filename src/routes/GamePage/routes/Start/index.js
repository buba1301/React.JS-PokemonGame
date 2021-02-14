import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import pokemons from '../../../../pokemons';

import PokemonCard from '../../../../components/PokemonCard';
import Button from '../../../../components/Button';

import s from './Start.module.css';

import bg1 from './assets/bg1.jpg';

import { FireBaseContext } from '../../../../context/fireBaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';

const StartPage = () => {
  const fireBase = useContext(FireBaseContext);
  const pokemonContext = useContext(PokemonContext);

  const history = useHistory();

  const [pokemonsList, setPokemons] = useState({});

  const selectedPokemonsLength = Object.keys(pokemonContext.pokemons).length;

  useEffect(() => {
    fireBase.getPokemonsSoket((pokemons) => {
      setPokemons(pokemons);
    });

    return () => fireBase.offPokemonsSoket();
  }, []);

  const handleSelectedPokemon = (key) => {
    const selectedPokemon = { ...pokemonsList[key] };
    pokemonContext.addPokemon(key, selectedPokemon);

    setPokemons((prevState) => {
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          selected: !prevState[key].selected,
        },
      };
    });
  };

  const handleOpenBoard = () => {
    history.push('/game/board');
  };

  return (
    <div className={s.container}>
      <div className={s.buttonWrap}>
        <Button onClick={handleOpenBoard} disabled={selectedPokemonsLength < 5}>
          Start Game
        </Button>
      </div>
      <div className={s.flex}>
        {Object.entries(pokemonsList).map(
          ([key, { type, values, name, img, id, selected }]) => {
            return (
              <PokemonCard
                key={key}
                type={type}
                values={values}
                name={name}
                img={img}
                id={id}
                handleSelectedPokemon={() => {
                  if (selectedPokemonsLength < 5 || selected) {
                    handleSelectedPokemon(key);
                  }
                }}
                active={true}
                selected={selected}
                className={s.card}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default StartPage;
