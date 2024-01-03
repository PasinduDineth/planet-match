import React, { useState } from 'react';
import Board from './board';
import PlayerNamesInput from './playerNamesInput';

interface Errors {
  player1Error: boolean;
  player2Error: boolean;
}

const Game: React.FC = () => {
  const [player1, setPlayer1] = useState<string>('');
  const [player2, setPlayer2] = useState<string>('');
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    player1Error: false,
    player2Error: false
  });

  const handleStartGame = () => {
    if (player1.trim() !== '' && player2.trim() !== '') {
      setGameStarted(true);
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        player1Error: player1.trim() === '',
        player2Error: player2.trim() === ''
      }));
    }
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setPlayer1('')
    setPlayer2('')
  };

  const onChangeInput = (name: string, value: string) => {
    name === "player1" ? setPlayer1(value) : setPlayer2(value)
  };
  return (
    <div className="flex flex-col items-center w-full">
      {!gameStarted ? (
        <PlayerNamesInput onSubmit={handleStartGame} onChangeInput={onChangeInput} player1={player1} player2={player2} errors={errors}/>
      ) : (
          <Board player1={player1} player2={player2} handleResetGame={handleResetGame}/>
      )}
    </div>
  );
};

export default Game;
