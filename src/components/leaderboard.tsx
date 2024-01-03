import React, { useEffect, useState } from 'react';

interface PlayerScores {
  [key: string]: number;
}

interface LeaderboardProps {
  onGoBack: () => void;
}

const LOCAL_STORAGE_KEY = 'scores';

const LeaderBoard: React.FC<LeaderboardProps> = ({ onGoBack }) => {
  const [leaderBoard, setLeaderBoard] = useState<PlayerScores[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardString = localStorage.getItem(LOCAL_STORAGE_KEY);
        const parsedLeaderboard = leaderboardString ? JSON.parse(leaderboardString) : [];
        setLeaderBoard(parsedLeaderboard);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex bg-[#653054] bg-opacity-60 flex-col p-10 rounded-2xl xs:w-[90%] sm:w-[60%] md:w-[75%] lg:w-[80%] xl:w-[50%] mx-auto items-center'>
      <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white'>Leaderboard</p>
      <div className='flex justify-between w-full px-10 mt-4'>
        <p className='text-yellow-400 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Player</p>
        <p className='text-yellow-400 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Wins</p>
      </div>
      {isLoading ? (
        <p className='text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4'>Loading...</p>
      ) : isError ? (
        <p className='text-red-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4'>Error fetching data</p>
      ) : (
        [...leaderBoard].sort((a: PlayerScores, b: PlayerScores) => {
          const valuesA = Object.values(a)[0];
          const valuesB = Object.values(b)[0];
          return valuesB - valuesA;
        }).map((playerScores: PlayerScores, index: number) => (
          <div key={index} className='flex justify-between w-full px-10 mt-4'>
            <p className='text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>{Object.keys(playerScores)}</p>
            <p className='text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>{Object.values(playerScores)}</p>
          </div>
        ))
      )}
      <button
        onClick={onGoBack}
        className='bg-yellow-400 px-4 py-2 m-4 rounded-lg text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800'
      >
        Go Back
      </button>
    </div>
  );
};

export default LeaderBoard;
