import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PokemonContext } from '../../../../context/pokemonContext';

import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './components/PlayerBoard/insex';
import Result from './components/Result';

import routes from '../../../../service/routes';
import s from './Board.module.css';
import ArrowChoice from '../../../../components/ArrowChoice';
import { counterWin, getFirstStepInGame } from '../../../../utils';
import { actions, asyncActions, selectors } from '../../../../slices';

const renderArrowChoise = (firstStep) =>
  firstStep === 0 ? (
    <ArrowChoice />
  ) : (
    <ArrowChoice stop={true} side={firstStep} />
  );

const BoardPage = () => {
  const { pokemons, addPlayer2Pokemons } = useContext(PokemonContext);

  const dispatch = useDispatch();
  const history = useHistory();

  // const board = useSelector(selectors.selectGameBoard);
  const selectedPokemons = useSelector(selectors.selectGameSelectedPokemons);
  const player2Pokemons = useSelector(selectors.selectGamePlayer2Pokemons);
  const result = useSelector(selectors.selectGameResult);

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
  const [step, setStep] = useState(0);
  const [whoseStep, setWhoseStep] = useState(0);
  // const [result, setResult] = useState(null);

  if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  }

  useEffect(() => {
    const getData = async () => {
      const boardResponse = await fetch(routes.getBoard.url);
      const boardRequest = await boardResponse.json();

      setBoard(boardRequest.data);

      // const palyer2Response = await fetch(routes.getPlayer2.url);
      // const palyer2Request = await palyer2Response.json();

      dispatch(asyncActions.getPlayer2Pokemons());

      /*setPlayer2(() => {
        return palyer2Request.data.map((pokemon) => ({
          ...pokemon,
          possession: 'red',
        }));
      });*/

      // addPlayer2Pokemons(palyer2Request.data);
    };

    getData();
  }, []);

  useEffect(() => {
    setPlayer2(() => {
      return player2Pokemons.map((pokemon) => ({
        ...pokemon,
        possession: 'red',
      }));
    });
  }, [player2Pokemons]);

  useEffect(() => {
    if (step === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 === count2) {
        dispatch(actions.addResult('draw'));
        // setResult('drow');
      } else {
        count1 > count2
          ? dispatch(actions.addResult('win'))
          : dispatch(actions.addResult('lose'));
      }

      setTimeout(() => {
        history.push('/game/finish');
      }, 5000);
    }
  }, [step]);

  useEffect(() => {
    const playerNumber = getFirstStepInGame(1, 2);

    setTimeout(() => {
      setWhoseStep(playerNumber);
    }, 3000);
  }, []);

  const filterPlayerPokemons = (prevState) =>
    prevState.filter(({ id }) => id !== selectedCard.id);

  const handleClickBoardPlate = async (position) => {
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

      selectedCard.player === 1
        ? setPlayer1(filterPlayerPokemons)
        : setPlayer2(filterPlayerPokemons);

      setBoard(request.data);

      setStep((prevState) => {
        const count = prevState + 1;
        return count;
      });

      setWhoseStep((prevState) => (prevState === 1 ? 2 : 1));
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
          whoseStep={whoseStep === 1}
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

      {!selectedCard && renderArrowChoise(whoseStep)}

      {result && <Result type={result} />}

      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={(card) => handleClickCard(card)}
          whoseStep={whoseStep === 2}
        />
      </div>
    </div>
  );
};

export default BoardPage;
