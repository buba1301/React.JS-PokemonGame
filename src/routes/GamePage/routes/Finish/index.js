import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../../components/Button';
import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/fireBaseContext';

import s from './Finish.module.css';
import { actions, selectors } from '../../../../slices';
import apiRoutes from '../../../../api';

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
  const dispatch = useDispatch();
  const fireBase = useContext(FireBaseContext);

  const user = useSelector(selectors.selectUser);
  const player1SelectedCards = useSelector(
    selectors.selectGameSelectedPokemons
  );
  const player2SelectedCards = useSelector(selectors.selectGamePlayer2Pokemons);
  const result = useSelector(selectors.selectGameResult);

  const [player1Cards] = useState(Object.values(player1SelectedCards));
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
    dispatch(actions.clearBoard());

    if (result === 'win') {
      const data = winCard;
      const idToken = localStorage.getItem('idToken');

      console.log('User', data);
      console.log('User', user.localId);
      console.log('User', idToken);
      console.log(
        'User',
        `${apiRoutes.addPlayerWithStartPokemons.url}/${user.localId}/pokemons.json?auth=${idToken}`
      );
      console.log('User', apiRoutes.addPlayerWithStartPokemons.method);
      data.selected = false;

      await fetch(
        `${apiRoutes.addPlayerWithStartPokemons.url}/${user.localId}/pokemons.json`,
        {
          method: apiRoutes.addPlayerWithStartPokemons.method,
          body: JSON.stringify(data),
        }
      );
    }
    history.push('/game');
  };

  if (Object.keys(player1SelectedCards).length === 0) {
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
