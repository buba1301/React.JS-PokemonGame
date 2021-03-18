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

  const handleAddPlayer2Cards = (palyer2) => {
    setPokemon((prevState) => {
      return {
        ...prevState,
        player2: [...palyer2],
      };
    });
  };

  const clearContext = () => {
    setPokemon({});
  };

  const contextValue = {
    pokemons,
    addPokemon: handleSelectedPokemon,
    addPlayer2Pokemons: handleAddPlayer2Cards,
    clearContext,
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
