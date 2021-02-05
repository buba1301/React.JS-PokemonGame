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

  const handleClick = () => {
    handleOpenCard && handleOpenCard(id);
  };

  return (
    <div className={s.root} onClick={handleClick}>
      <div className={classNamesPokemonCard}>
        <div className={s.cardFront}>
          <div className={cn(s.wrap, s.front)}>
            <div className={cn(s.pokemon, s[type])}>
              <div className={s.values}>
                {valuesToArray.map(([key, value]) => {
                  return (
                    <div className={cn(s.count, s[key])} key={key}>
                      {value}
                    </div>
                  );
                })}
              </div>
              <div className={s.imgContainer}>
                <img src={img} alt={name} />
              </div>
              <div className={s.info}>
                <span className={s.number}>#{id}</span>>
                <h3 className={s.name}>{name}</h3>
                <small className={s[type]}>
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
