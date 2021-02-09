import { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import StartPage from './routes/Start';
import BoardPage from './routes/Board';
import FinishPage from './routes/Finish';
import { PokemonContext } from '../../context/pokemonContext';

const GamePage = () => {
  const match = useRouteMatch();

  const [pokemons, setPokemon] = useState([]);

  const contextValue = {
    pokemons,
    addPokemon(value) {
      setPokemon((prevState) => [...prevState, value]);
    },
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
