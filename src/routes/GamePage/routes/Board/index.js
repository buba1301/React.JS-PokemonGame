import { useContext } from 'react';
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './Board.module.css';

const boardFields = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const BoardPage = () => {
  const pokemons = useContext(PokemonContext);

  return (
    <div className={s.root}>
      {pokemons.pokemons.map(({ type, values, name, img, id }) => (
        <div className={s.playerOne} key={id}>
          <PokemonCard
            type={type}
            values={values}
            name={name}
            img={img}
            id={id}
            className='big'
          />
        </div>
      ))}

      <div className={s.board}>
        {boardFields.map((filedNumber) => (
          <div className={s.boardPlate}>{filedNumber}</div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
