import { useState } from 'react';
import cn from 'classnames';
import PokemonCard from '../../../../../../components/PokemonCard';

import s from './PlayerBoard.module.css';

const PlayerBoard = ({ player, cards, onClickCard, whoseStep }) => {
  const [isSelected, setIsSelected] = useState(null);

  const handleClick = (card) => {
    if (whoseStep) {
      setIsSelected(card.id);
      onClickCard &&
        onClickCard({
          ...card,
          player,
        });
    }
  };

  return (
    <>
      {cards.map((card) => {
        const { type, values, name, img, id } = card;

        const classNameCard = cn(s.card, {
          [s.selected]: isSelected === id,
        });

        return (
          <div
            key={id}
            className={classNameCard}
            onClick={() => handleClick(card)}
          >
            <PokemonCard
              type={type}
              values={values}
              name={name}
              img={img}
              id={id}
              minimize={true}
            />
          </div>
        );
      })}
    </>
  );
};

export default PlayerBoard;
