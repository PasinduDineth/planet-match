import React from 'react';

interface PlayerIndicatorProps {
  currentPlayer: number;
  winner: number | string | null;
  player1: string;
  player2: string;
}

const PlayerIndicator: React.FC<PlayerIndicatorProps> = ({ currentPlayer, winner, player1, player2 }) => {
  const playerText = `It's ${currentPlayer === 1 ? player1 : player2}'s turn`;
  const winnerText = `${winner === 1 ? player1 : player2} wins the game`;

  return (
    <div className="mt-3 bg-black bg-opacity-50 px-20 rounded-3xl pop-up flex flex-col items-center">
      <p className="text-white text-center xl:text-[50px] md:text-[30px] sm:text-[25px] xs:text-[20px] py-2">
        {winner === 'draw' ? 'No Winner.' : winner ? winnerText : playerText}
      </p>
    </div>
  );
};

export default PlayerIndicator;
