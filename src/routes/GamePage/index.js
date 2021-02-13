import { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import { PokemonContext } from '../../context/pokemonContext';

const GamePage = () => {
  const match = useRouteMatch();

  const [pokemons, setPokemon] = useState({});

  const handleSelectedPokemon = (key, pokemon) => {
    setPokemon((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];

        return copyState;
      }

      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };

  const contextValue = {
    pokemons,
    addPokemon: handleSelectedPokemon,
  };

  return (
    <PokemonContext.Provider value={contextValue}>
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
