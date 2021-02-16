import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/fireBaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';

import s from './Finish.module.css';
import { selectors } from '../../../../slices';

const renderPlayerCards = (
  cards,
  handleSelectedPokemon = () => {},
  winCard
) => {
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

  const player1SelectedCards = useSelector(
    selectors.selectGameSelectedPokemons
  );
  const player2SelectedCards = useSelector(selectors.selectGamePlayer2Pokemons);
  const result = useSelector(selectors.selectGameResult);

  const [player1Cards, setPlayer1Cards] = useState(() => {
    return Object.values(player1SelectedCards);
  });
  const [player2Cards, setPlayer2Cards] = useState(player2SelectedCards);

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
        {result === 'win'
          ? renderPlayerCards(player2Cards, handleSelectedPokemon, winCard)
          : renderPlayerCards(player2Cards)}
      </div>
    </div>
  );
};

export default FinishPage;
