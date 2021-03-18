import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PokemonCard from '../../../../components/PokemonCard';
import Button from '../../../../components/Button';

import s from './Start.module.css';

import { actions, asyncActions, selectors } from '../../../../slices';
import apiRoutes from '../../../../api';

const StartPage = () => {
  const pokemons = useSelector(selectors.selectPokemonsData);
  const user = useSelector(selectors.selectUser);
  const selectedPokemons = useSelector(selectors.selectGameSelectedPokemons);

  const dispatch = useDispatch();

  const history = useHistory();

  const idToken = localStorage.getItem('idToken');

  const [pokemonsList, setPokemons] = useState({});

  const selectedPokemonsLength = Object.keys(selectedPokemons).length;

  useEffect(() => {
    dispatch(asyncActions.getPokemons());
  }, []);

  useEffect(() => {
    setPokemons(pokemons);
  }, [pokemons]);

  const handleSelectedPokemon = (key) => {
    const selectedPokemon = { ...pokemonsList[key] };
    dispatch(actions.addSelectedPokemon({ key, selectedPokemon }));

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

  const handleOpenBoard = async () => {
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
