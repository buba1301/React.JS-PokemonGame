import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';

import PokemonCard from '../../../../components/PokemonCard';

import routes from '../../../../service/routes';
import s from './Board.module.css';
import PlayerBoard from './components/PlayerBoard/insex';

const BoardPage = () => {
  const { pokemons } = useContext(PokemonContext);

  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(pokemons).map((pokemon) => {
      return {
        ...pokemon,
        possession: 'blue',
      };
    });
  });
  const [player2, setPlayer2] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const history = useHistory();

  if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  }

  useEffect(() => {
    const getData = async () => {
      const boardResponse = await fetch(routes.getBoard.url);
      const boardRequest = await boardResponse.json();

      setBoard(boardRequest.data);

      const palyer2Response = await fetch(routes.getPlayer2.url);
      const palyer2Request = await palyer2Response.json();

      setPlayer2(() => {
        return palyer2Request.data.map((pokemon) => ({
          ...pokemon,
          possession: 'red',
        }));
      });
    };

    getData();
  }, []);

  const handleClickBoardPlate = async (position) => {
    console.log('POSITION', position);
    console.log('SELECTED CARD', selectedCard);

    if (selectedCard) {
      const params = {
        position,
        card: selectedCard,
        board,
      };

      const res = await fetch(routes.postCard.url, {
        method: routes.postCard.method,
        headers: routes.postCard.headers,
        body: JSON.stringify(params),
      });

      const request = await res.json();

      console.log('REQUEST', request);
      setBoard(request.data);
    }
  };

  const handleClickCard = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          cards={player1}
          onClickCard={(card) => handleClickCard(card)}
        />
      </div>

      <div className={s.board}>
        {board.map(({ position, card }) => (
          <div
            className={s.boardPlate}
            key={position}
            onClick={() => !card && handleClickBoardPlate(position)}
          >
            {card && (
              <PokemonCard {...card} minimize={true} className={s.card} />
            )}
          </div>
        ))}
      </div>

      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={(card) => handleClickCard(card)}
        />
      </div>
    </div>
  );
};

export default BoardPage;
