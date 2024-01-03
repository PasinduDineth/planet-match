import React from 'react';

interface DropButtonProps {
  onClick: () => void;
  currentPlayer: number;
}

const DropButton: React.FC<DropButtonProps> = ({ onClick, currentPlayer }) => {
  return (
    <div style={{
      backgroundImage: `url(${currentPlayer === 1 ? '../../src/assets/redDisk.png' : '../../src/assets/yellowDisk.png'})`,
      backgroundSize: 'cover'
    }}
    className={`cursor-pointer relative w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-${currentPlayer === 1 ? "[#653054]" : "yellow-400"} rounded-full m-1 animatedButton shadow-slate-100`} onClick={onClick}>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold xl:text-[16px] md:text-[12px] sm:text-[10px] xs:text-[6px]">
        DROP
      </div>
    </div>
  );
};

export default DropButton;