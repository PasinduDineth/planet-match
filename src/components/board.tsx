import React, { useEffect, useState } from 'react';
import Column from './column';
import DropButton from './dropButton';
import PlayerIndicator from './playerIndicator';
import useAudio from '../utils/useAudio';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
interface CustomWindow extends Window {
  connectFour?: {
    deepClone: (arr: any) => any;
    checkForWinner: (board: number[][]) => number | string | null;
  };
}

interface BoardProps {
  player1: string;
  player2: string;
  handleResetGame: () => void;
}

interface PlayerScores {
  [playerName: string]: number;
}

const initialBoard: (number | null)[][] = Array.from({ length: 6 }, () => Array(7).fill(null));

const Board: React.FC<BoardProps> = ({ player1, player2, handleResetGame }) => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState<number | string | null>(null);
  const [scores, setScores] = useState<PlayerScores>({
    player1Score: 0,
    player2Score: 0,
  });

  const winMusic = useAudio('winMusic');
  const dropMusic = useAudio('dropMusic');

  const updateScoresInLocalStorage = (winnerName: string, currentLeaderboard: PlayerScores[]) => {
    const winnerIndex = currentLeaderboard.findIndex((player) => player.hasOwnProperty(winnerName));
  
    if (winnerIndex !== -1) {
      currentLeaderboard[winnerIndex][winnerName] += 1;
    } else {
      currentLeaderboard.push({ [winnerName]: 1 });
    }
  
    localStorage.setItem('scores', JSON.stringify(currentLeaderboard));
  };

  useEffect(() => {
    const result = (window as CustomWindow).connectFour?.checkForWinner(board as number[][]);
    if (result) {
      setWinner(result);

      if (result === 1 || result === 2) {
        setScores((prevScores) => ({
          ...prevScores,
          [`player${result}Score`]: prevScores[`player${result}Score`] + 1,
        }));

        winMusic()

        const winnerName = result === 1 ? player1 : player2;

        const storedLeaderboardString = localStorage.getItem('scores');
        let currentLeaderboard: PlayerScores[] = storedLeaderboardString
          ? JSON.parse(storedLeaderboardString)
          : [];

        if (!Array.isArray(currentLeaderboard)) {
          currentLeaderboard = [];
        }

        updateScoresInLocalStorage(winnerName, currentLeaderboard);
      }
    }
  }, [board]);

  const handleDropButtonClick = (columnIndex: number) => {
    dropMusic()
    if(winner){return}
    const updatedBoard = board.map((row) => [...row]);

    for (let row = 5; row >= 0; row--) {
      if (updatedBoard[row][columnIndex] === null) {
        updatedBoard[row][columnIndex] = currentPlayer;
        break;
      }
    }

    setBoard(updatedBoard);
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
  };

  const reset = () => {
    setBoard(initialBoard);
    setWinner(null);
    setCurrentPlayer(1);
  };

  const scoreTextPlayer1 = `${player1} : ${scores.player1Score}`;
  const scoreTextPlayer2 = `${player2} : ${scores.player2Score}`;
  const { width, height } = useWindowSize()
  return (
    <div className="flex flex-col items-center">
      {winner && <Confetti
      width={width}
      height={height}
      gravity={0.5}
      />}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-2">
        <button
          onClick={handleResetGame}
          className="bg-yellow-400 px-4 py-2 m-4 rounded-lg xl:text-[30px] md:text-[25px] sm:text-[20px] xs:text-[18px] text-gray-800"
        >
          Go Back
        </button>
        <div className="flex flex-col bg-[#653054] bg-opacity-60 px-4 py-2 rounded-xl">
          <p className="text-2xl my-1 text-white">{scoreTextPlayer1}</p>
          <p className="text-2xl my-1 text-white">{scoreTextPlayer2}</p>
        </div>
      </div>
      <div className="flex mb-2">
        {!winner &&
          [...Array(7)].map((_, index) => (
            <DropButton key={index} onClick={() => handleDropButtonClick(index)} currentPlayer={currentPlayer} />
          ))}
        {winner !== null && (
          <button
            onClick={reset}
            className="bg-yellow-400 px-4 py-2 m-4 rounded-lg xl:text-[30px] md:text-[25px] sm:text-[20px] xs:text-[18px] text-gray-800"
          >
            Play Again
          </button>
        )}
      </div>
      <div className="flex bg-[#653054] bg-opacity-60 p-5 rounded-3xl">
        {[...Array(7)].map((_, columnIndex) => (
          <Column key={columnIndex} columnIndex={columnIndex} values={board.map((row) => row[columnIndex])} />
        ))}
      </div>
      <PlayerIndicator currentPlayer={currentPlayer} winner={winner} player1={player1} player2={player2} />
    </div>
  );
};

export default Board;
