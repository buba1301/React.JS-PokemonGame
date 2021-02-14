import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';

import PokemonCard from '../../../../components/PokemonCard';

import routes from '../../../../service/routes';
import s from './Board.module.css';
import PlayerBoard from './components/PlayerBoard/insex';

const BoardPage = () => {
  const [board, setBoard] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const { pokemons } = useContext(PokemonContext);

  const history = useHistory();

  /* if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  } */

  useEffect(() => {
    const getData = async () => {
      const boardResponse = await fetch(routes.getBoard.url);
      const boardRequest = await boardResponse.json();

      setBoard(boardRequest.data);

      const palyer2Response = await fetch(routes.getPlayer2.url);
      const palyer2Request = await palyer2Response.json();

      setPlayer2(palyer2Request.data);
    };

    getData();
  }, []);

  const handleClickBoardPlate = (position) => {
    console.log('POSITION', position);
    console.log('SELECTED CARD', selectedCard);
  };

  const handleClickCard = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard
          cards={Object.values(pokemons)}
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
          cards={player2}
          onClickCard={(card) => handleClickCard(card)}
        />
      </div>
    </div>
  );
};

export default BoardPage;
