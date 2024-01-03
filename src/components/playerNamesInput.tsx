import React, { useState, ChangeEvent } from 'react';
import LeaderBoard from './leaderboard';

interface PlayerNamesInputProps {
  onSubmit: () => void;
  onChangeInput: (name: string, value: string) => void;
  player1: string;
  player2: string;
  errors: {
    player1Error: boolean;
    player2Error: boolean;
  };
}

const PlayerNamesInput: React.FC<PlayerNamesInputProps> = ({
  onSubmit,
  onChangeInput,
  player1,
  player2,
  errors,
}) => {
  const [isLeaderboardShowing, setLeaderboardShowing] = useState(false);

  const onChangePlayerNames = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e.target.name, e.target.value);
  };

  const onLeaderBoardClick = () => {
    setLeaderboardShowing(true);
  };

  const onGoBack = () => {
    setLeaderboardShowing(false);
  };

  return (
    <div className="flex w-full justify-center">
  {isLeaderboardShowing ? (
    <LeaderBoard onGoBack={onGoBack} />
  ) : (
    <div className="flex flex-col items-center bg-[#653054] bg-opacity-60 rounded-2xl p-8">
      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white">
        Planet Match
      </h2>
      <div className="p-2 m-2">
        <input
          type="text"
          name="player1"
          placeholder="Player 1 name"
          value={player1}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl rounded-2xl text-purple-800 pl-3 outline-none border-none"
          onChange={onChangePlayerNames}
        />
        {errors.player1Error && (
          <p className="text-yellow-400 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-left mt-2">
            Player name shouldn't be empty.
          </p>
        )}
      </div>
      <div className="p-2 m-2">
        <input
          type="text"
          name="player2"
          placeholder="Player 2 name"
          value={player2}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl rounded-2xl text-purple-800 pl-3 outline-none border-none"
          onChange={onChangePlayerNames}
        />
        {errors.player2Error && (
          <p className="text-yellow-400 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-left mt-2">
            Player name shouldn't be empty.
          </p>
        )}
      </div>
      <button
        onClick={onSubmit}
        className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl rounded-2xl p-4 bg-yellow-400 m-2 text-white"
      >
        Start Game
      </button>
      <button
        onClick={onLeaderBoardClick}
        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl rounded-2xl p-4 bg-[#653054] m-2 text-white"
      >
        Leaderboard
      </button>
    </div>
  )}
</div>

  );
};

export default PlayerNamesInput;
