import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './Board.module.css';

const boardFields = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const BoardPage = () => {
  const { pokemons } = useContext(PokemonContext);

  const history = useHistory();

  console.log('HISTORY', history);

  if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  }

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
        {boardFields.map((filedNumber) => (
          <div className={s.boardPlate}>{filedNumber}</div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
