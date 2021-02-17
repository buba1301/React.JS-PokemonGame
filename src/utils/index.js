export const getFirstStepInGame = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach(({ card }) => {
    card.possession === 'blue' ? (player1Count += 1) : (player2Count += 1);
  });

  return [player1Count, player2Count];
};
