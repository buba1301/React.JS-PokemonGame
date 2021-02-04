import { useState } from 'react';
import cn from 'classnames';
import s from './PokemonCard.module.css';

import imgBack from './assets/cardBack.jpg';

const PokemonCard = ({
  type,
  values,
  name,
  img,
  id,
  handleOpenCard,
  active,
}) => {
  const classNamesPokemonCard = cn(s.pokemonCard, { [s.active]: active });

  const valuesToArray = Object.entries(values);

  const handleClick = ({ target }) => {
    handleOpenCard && handleOpenCard(target.id);
  };

  return (
    <div className={s.root} onClick={handleClick} id={id}>
      <div className={classNamesPokemonCard} id={id}>
        <div className={s.cardFront} id={id}>
          <div className={cn(s.wrap, s.front)} id={id}>
            <div className={cn(s.pokemon, s[type])} id={id}>
              <div className={s.values} id={id}>
                {valuesToArray.map(([key, value]) => {
                  return (
                    <div className={cn(s.count, s[key])} key={key} id={id}>
                      {value}
                    </div>
                  );
                })}
              </div>
              <div className={s.imgContainer} id={id}>
                <img src={img} alt={name} id={id} />
              </div>
              <div className={s.info} id={id}>
                <span className={s.number} id={id}>
                  #{id}
                </span>
                >
                <h3 className={s.name} id={id}>
                  {name}
                </h3>
                <small className={s[type]} id={id}>
                  Type: <span>{type}</span>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className={s.cardBack}>
          <div className={cn(s.wrap, s.back)}>
            <img src={imgBack} alt='Сard Backed' id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
