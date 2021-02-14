import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';

import PokemonCard from '../../../../components/PokemonCard';

import routes from '../../../../service/routes';
import s from './Board.module.css';

const BoardPage = () => {
  const [board, setboard] = useState([]);
  const { pokemons } = useContext(PokemonContext);

  const history = useHistory();

  if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  }

  useEffect(() => {
    const getBoard = async () => {
      const boardResponse = await fetch(routes.getBoard.url);
      const boardRequest = await boardResponse.json();

      setboard(boardRequest.data);
    };

    getBoard();
  }, []);

  const handleClickBoardPlate = (position) => {
    console.log('POSITION', position);
  };

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {Object.values(pokemons).map(({ type, values, name, img, id }) => (
          <PokemonCard
            key={id}
            type={type}
            values={values}
            name={name}
            img={img}
            id={id}
            minimize={true}
            className={s.card}
          />
        ))}
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
    </div>
  );
};

export default BoardPage;
