import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Button';
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';

import s from './Finish.module.css';

const renderPlayerCards = (cards) => {
  return cards.map((card) => <PokemonCard key={card.id} {...card} />);
};

const FinishPage = () => {
  const { pokemons } = useContext(PokemonContext);

  const player1Cards = Object.entries(pokemons)
    .filter(([key]) => key !== 'player2')
    .map(([_key, value]) => value);

  const player2Cards = pokemons.player2;

  console.log('player1Cards', player1Cards, player2Cards);

  const history = useHistory();

  const handleClickButton = () => {
    history.push('/game');
  };

  if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  }
  return (
    <div className={s.root}>
      <div className={s.player}>{renderPlayerCards(player1Cards)}</div>
      <div className={s.buttonWrap}>
        <Button onClick={handleClickButton}>Finish Game</Button>
      </div>
      <div className={s.player}>{renderPlayerCards(player2Cards)}</div>
    </div>
  );
};

export default FinishPage;
