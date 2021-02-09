import s from './Board.module.css';

const boardFields = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const BoardPage = () => {
  return (
    <div className={s.root}>
      <div className={s.playerOne}></div>
      <div className={s.board}>
        {boardFields.map((filedNumber) => (
          <div className={s.boardPlate}>{filedNumber}</div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
