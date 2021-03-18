import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '../../components/Button';
import PokemonCard from '../../components/PokemonCard';
import { asyncActions, selectors } from '../../slices';

import s from './UserPage.module.css';

const UserPage = () => {
  const user = useSelector(selectors.selectUser);
  const pokemons = useSelector(selectors.selectPokemonsData);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(asyncActions.getPokemons());
  }, []);

  const handleClickBackButton = () => {
    history.push('/');
  };

  return (
    <div className={s.root}>
      <div>Name: {user.email}</div>
      <div className={s.cardsContainer}>
        {Object.entries(pokemons).map(
          ([key, { type, values, name, img, id, selected }]) => {
            return (
              <PokemonCard
                key={key}
                type={type}
                values={values}
                name={name}
                img={img}
                id={id}
                active={true}
                selected={selected}
                className={s.card}
              />
            );
          }
        )}
      </div>
      <div className={s.buttonWrap}>
        <Button onClick={handleClickBackButton}>Back to home</Button>
      </div>
    </div>
  );
};

export default UserPage;
