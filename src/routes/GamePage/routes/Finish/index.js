import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Button';
import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/fireBaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';

import s from './Finish.module.css';

const renderPlayerCards = (cards, handleSelectedPokemon, winCard) => {
  return cards.map(({ type, values, name, img, id, selected }) => (
    <PokemonCard
      key={id}
      type={type}
      values={values}
      name={name}
      img={img}
      id={id}
      selected={selected}
      handleSelectedPokemon={() => {
        if (!winCard || winCard.id === id) {
          handleSelectedPokemon(id);
        }
      }}
    />
  ));
};

const FinishPage = () => {
  const fireBase = useContext(FireBaseContext);
  const { pokemons, clearContext } = useContext(PokemonContext);

  const [player1Cards, setPlayer1Cards] = useState(() => {
    return Object.entries(pokemons)
      .filter(([key]) => key !== 'player2')
      .map(([_key, value]) => value);
  });
  const [player2Cards, setPlayer2Cards] = useState(pokemons.player2);

  const [winCard, setWinCard] = useState(null);

  const history = useHistory();

  const handleSelectedPokemon = (id) => {
    const selectedCard = player2Cards.find((card) => card.id === id);

    const newCard = {
      ...selectedCard,
      selected: !selectedCard.selected,
    };

    if (!winCard) {
      setWinCard(newCard);
    } else {
      setWinCard(null);
    }

    setPlayer2Cards((prevState) => {
      const newState = prevState.reduce((acc, item) => {
        return item.id === id ? [...acc, newCard] : [...acc, item];
      }, []);

      return newState;
    });
  };

  const handleClickButton = async () => {
    clearContext();
    const data = winCard;
    data.selected = false;
    await fireBase.addPokemon(data, () => {});
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
      <div className={s.player}>
        {renderPlayerCards(player2Cards, handleSelectedPokemon, winCard)}
      </div>
    </div>
  );
};

export default FinishPage;
